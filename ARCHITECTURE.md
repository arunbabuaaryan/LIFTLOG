# LiftLog — Architecture Notes

This is a deliberately dependency-free, single-file PWA: `index.html` holds
the markup, styles, and app logic; `sw.js` and `manifest.json` make it
installable and offline-capable. There's no build step — you edit
`index.html` directly and it works. That constraint is intentional (it's
what makes the app trivial to self-host, back up, and hand-edit), so the
"flexible architecture" work below focused on organizing the *logic inside*
that one file rather than splitting it into a multi-file build pipeline.

Two patterns were introduced to make the app easier to extend safely.
Everything else (state + `render()` on every change, event handlers wired
via `onclick`, feature-specific `showXModal()` helpers) was left as-is —
it already works, and rewriting working code for its own sake just adds
regression risk.

## 1. The exercise mode registry (`EXERCISE_MODES`)

**Where:** search for `EXERCISE_MODES` (~line 680) and `getExerciseMode()`
(~line 800).

**Problem it solves:** before this change, "how does a weighted exercise
progress vs. a timed one" was answered by eight-plus separate `if (ex.mode
=== 'weighted') ... else if (ex.mode === 'timed')` chains scattered across
state init, target display, the live weight control, the finish/progression
engine, and PR tracking. Adding a new exercise type meant hunting down every
one of those chains and adding a matching branch — easy to miss one.

**How it works now:** each mode is one object implementing a fixed
interface — `initState`, `getTargetValue`, `label`, `hasWeightControl`,
`adjustWeight`, `successCheck`, `onSuccess`, `onFail`, `sessionBestValue`,
`historyWeight`, `unit`, plus the `usesProgressiveSets` / `usesWeightAsBest`
flags and optional `stepSize`. Every core function above now just calls
`getExerciseMode(ex).theRelevantMethod(...)` instead of branching itself.

**To add a new exercise type** (say, a distance-based "cardio" mode):
write one new entry in `EXERCISE_MODES` implementing that interface. You
don't need to touch `getExState`, `targetLabel`, `finishExerciseConfirmed`,
`getHistoricalMax`, or the card rendering — they already call through the
registry. You will still need to add the mode to the "Add Exercise" form in
Manage (the dropdown + which config fields to show) since that's a UI form,
not business logic — see the scoping note below.

**What's deliberately *not* in the registry:** the exercise-editor form,
the "Add Exercise" form, and the progress charts still branch on
`ex.mode === '...'` directly. Those are UI-form scaffolding (which input
fields to show, how to draw a chart axis) rather than the actual
progression algorithm — the part that was genuinely duplicated and
error-prone. Routing form-field visibility through the registry too would
mean generating those forms dynamically from a per-mode field schema, which
is a reasonable future step but a separate, larger project from fixing the
progression engine. Noting it here so it's a known boundary, not an
oversight.

## 2. Schema migrations (`MIGRATIONS` / `runMigrations`)

**Where:** search for `SCHEMA_VERSION` (~line 442).

**Problem it solves:** the old-shape-compatibility code (e.g. "give
exercises created before sets-progression existed a default sets range")
used to run as inline, unconditional patches on *every single load,
forever*, guarded only by ad hoc per-field checks (`ex.setsMin == null`).
That works, but it's not how anyone reading the code would know what
changed and when, and it doesn't scale — every future shape change would
add another permanent inline patch.

**How it works now:** `MIGRATIONS` is an ordered array. Each entry has a
`version` and a `migrate(state, days)` function. `runMigrations()` runs
every migration newer than the saved state's `version`, in order, then
stamps the state so they never run again. `hydrateDaysFromState()` is the
one place that derives the live `DAYS` config from `state.customDays` and
calls `runMigrations()` — it's used both at boot and after a backup/Drive
restore, so those paths can't drift out of sync (this was actually a real
bug in the pre-this-change code: restoring an old backup never re-ran the
compatibility patches at all).

**To make a future schema change:** add one entry to `MIGRATIONS` with the
next version number and bump `SCHEMA_VERSION`. Write the migration against
the *literal* mode strings/field names that existed at that point in time
— don't reach for `EXERCISE_MODES` from inside a migration. Migrations run
very early in boot, before the registry exists yet, and more importantly a
migration is a historical snapshot: it should still do the right thing
years from now even if the registry has changed shape by then.

**Rule:** never edit a migration that's already shipped (i.e., that real
users have already run) — anyone who already ran it has `state.version`
past it, so an edit would only affect people importing *old* backups going
forward, silently diverging from what already happened for existing users.
Add a new migration instead, even if it partially undoes an old one.

## Other extension points already in place

- **`WORKOUT_FLOW`** (~line 520): timing/behavior knobs for the guided
  workout flow (auto-advance delay, up-next preview count, whether the
  completion modal shows). Change these without touching render logic.
- **`getFocusMode()` / `setFocusMode()`**: the guided vs. full-list toggle
  is a simple stored boolean read at render time — a template for adding
  more "how the app behaves" preferences without new state-shape work.
- **Mistake-proofing guards** (`hasUnsavedFocusProgress`,
  `finishExercise`'s confirm-before-log-with-nothing-checked-off, the
  locked/`redoUnlocked` pattern for already-completed cards): these are
  all just extra `showConfirm(...)` calls gated on a specific risky
  condition. The pattern for adding a new one is: write a small pure
  function that detects the risky condition, then gate the action behind
  a `showConfirm` only when that condition is true — never add a
  confirmation to the "everything went normally" path.

## How this was verified

This refactor touched the core progression math, which is the part of the
app where a silent behavior change would be worst (it'd quietly corrupt
someone's weight/rep progression). It was verified by:

1. Running the exact same sequence of "finish exercise" calls against both
   the pre-refactor and post-refactor code (headless browser, Playwright),
   across all four exercise modes, through normal progression, deloads,
   set-count ceilings, weight-tier-ups, belt-ups, and the "fully maxed out"
   edge case — and diffing the resulting state. Byte-identical in every
   case.
2. Seeding a legacy (version-less) saved state and confirming migrations
   correctly bring it up to the current shape once, and are a true no-op
   on a second load.
3. A full click-through of focus mode, auto-advance, the completion modal,
   all three mistake-proofing guards, and Settings/Progress views, with a
   listener catching any uncaught JS error.

If you change `EXERCISE_MODES` or `MIGRATIONS` in the future, re-running
something like this before shipping is strongly recommended — the cost of
a silent bug here is a corrupted workout log, not just a UI glitch.
