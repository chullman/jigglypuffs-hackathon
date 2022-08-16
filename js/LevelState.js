class LevelState {
    constructor(startingLevel) {
        this._currentLevel = startingLevel;

        this._getAllLevelNums = {
            1: "one",
            2: "two",
            3: "three"
        }
    }

    getCurrentLevelName() {
        return this._getAllLevelNums[this._currentLevel];
    }

    increaseLevel() {
        this._currentLevel++
    }
}

export default LevelState;