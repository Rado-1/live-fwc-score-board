# Live Football World Cup Score Board

<p ><img alt="Angular" src="https://img.shields.io/badge/-Angular-C3002F?logo=Angular&logoColor=white"/> <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=white"/></p>

This is a coding exercise implemented in Angular. The application implements
a simple score board showing an ordered list of football matches. It is possible
to:

- start a new game with score 0:0,
- update score of an existing match, or
- finish a game which removes it from the score board.

The application was built with _behavior-driven development_ (_BDD_) and
_test-driven development_ (_TDD_) in mind; see [Step-by-step story](#step-by-step-story) later.

## Installation

1. Clone this GitHub repo locally by</br>
   `git clone https://github.com/Rado-1/live-fwc-score-board.git`
1. Install [Node.js](https://nodejs.org/en/download/) if you do not already have.
1. Run `npm install` in the local project root directory `live-fwc-score-board`.

## Running development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Step-by-step story

The application was created in the following steps corresponding to [Git
commits](https://github.com/Rado-1/live-fwc-score-board/commits/main) on the
`main` branch.

### 1. Generate empty Angular application

Commit: [ _Empty angular project_](https://github.com/Rado-1/live-fwc-score-board/commit/19b99b97826d04a0c1d20c7c49884df8118a014f)

This project was generated with [Angular
CLI](https://github.com/angular/angular-cli) version 14.0. Nothing special to
check at this stage.

### 2. Generate empty service and high-level testing specs

Commit: [_Added service and pending tests_](https://github.com/Rado-1/live-fwc-score-board/commit/43e11a1d6f11ec5d70e8d21ad1304d58f7e21a66)

The whole application logic is implemented in a single service
`ScoreBoardService` (file
[`score-board.service.ts`](https://github.com/Rado-1/live-fwc-score-board/blob/main/src/app/services/score-board.service.ts)).
The BDD/TDD principles are
illustrated only on unit testing of this service. Application UI is from testing
excluded intentionally to make the example simpler at this stage.

Simple testing specs written from the user's perspective were added
to the
[score-board.service.spec.ts](https://github.com/Rado-1/live-fwc-score-board/commit/43e11a1d6f11ec5d70e8d21ad1304d58f7e21a66#diff-01cce9bb45490913506e68c9790b42299371d65a76a7c7305346255d5862126c)
file. Success scenarios could be identified by "should allow to..." and
failure scenarios by "should avoid...". Unit tests are written in [Jasmine](https://jasmine.github.io/).

Running the tests results in:

![Test run #1](doc/img/testrun1.png?raw=true "Test run #1")

The generated spec `should be created` is successful, the newly defined specs are pending.

### 3. Definition of the ScoreBoardService API

Commit: [_ScoreBoardService API
defined_](https://github.com/Rado-1/live-fwc-score-board/commit/40acb3ff2cb6760731f6171a65241af50885b40d)

_Note: The previously committed `ScoreBoardServiceService` was renamed to
`ScoreBoardService` because of a typo._

In order to provide later implementation of testing specs, this step adds API to the
[ScoreBoardService](https://github.com/Rado-1/live-fwc-score-board/commit/40acb3ff2cb6760731f6171a65241af50885b40d#diff-b658c3dba276b9a720156c3324375daa6518e029bd9e0b62fbefbfcbe84d06a6).

The public methods that provide the basic application functionality are executed
synchronously, but their result, i.e., updated score
board, is delivered asynchronously. Score board is implemented as an immutable
array. This is due to good practices of reactive UI patterns applied for Angular.

For now, all public methods throw 'not implemented' exception causing temporal failure of
future tests until the functionality is fully implemented by the service.

Running the tests have the same result as in the previous process step.

### 4. Implementation of tests

Commit: [_Tests implemented_](https://github.com/Rado-1/live-fwc-score-board/commit/13b3668f3efe3e5b56fef7f02ad2c46a4c091c41)

All previously specified testing specs were enriched by their implementation
using the ScoreBoardService API.

Running the tests results in:

![Test run #2](doc/img/testrun2.png?raw=true "Test run #2")

All business-level tests fail with 'not implemented' exception.

### 5. Implementation of the service

Commit: [_ScoreBoardService implemented_](https://github.com/Rado-1/live-fwc-score-board/commit/5a8ef3100b956b32123b4a732c86a4a44bc69773)

ScoreBoardService is fully implemented.

Running the tests results in:

![Test run #3](doc/img/testrun3.png?raw=true "Test run #3")

All tests passed.

### 6. Implementation of UI

Commit: [_UI implemented_](https://github.com/Rado-1/live-fwc-score-board/commit/7a76d55b8c49573025ec9dcd62969eeac9836b11)

Implementation of UI in Angular Material. All UI is implemented in
`AppComponent` and related "child" components located in the same file
[`app.component.ts `](https://github.com/Rado-1/live-fwc-score-board/blob/main/src/app/app.component.ts).
This can be considered as the end of the 1st iteration of the TDD life cycle.

Screenshot:

![Screenshot](doc/img/scr.png?raw=true "Screenshot")

### 7. Refactoring the service

Commit: [_ScoreBoardService refactoring_](https://github.com/Rado-1/live-fwc-score-board/commit/96b40f37c9f2a9cb3683b904508494a076219e2b)

API and implementation of the `ScoreBoardService` is refactored. Method
signatures are unified and error handling is standardized.

This breaks the previously written tests:

![Test run #4](doc/img/testrun4.png?raw=true "Test run #4")

### 8. Fixing the service tests

Commit: [_ScoreBoardService test fixing_](https://github.com/Rado-1/live-fwc-score-board/commit/f4436c9d3999e24e1567814775867dd018b3e051)

The failing tests of the `ScoreBoardService` are fixed, the structure of tests
is updated and new tests are added.

Running the tests results in:

![Test run #5](doc/img/testrun5.png?raw=true "Test run #5")

### 9. Final iterations

Commit: [_Finalize_](https://github.com/Rado-1/live-fwc-score-board/commit/82ac4bcddb814cdc19258d8728f8a5d5f510e975)

To make the story shorter, the project has been finalized during several other
TDD iterations of code refactoring and unit test fixing/adding/refactoring. Also
testing of UI components has been added.

All tests are green now:

![Test run #6](doc/img/testrun6.png?raw=true "Test run #6")
