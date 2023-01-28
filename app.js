function getRandomValue (min, max) {
    return Math.floor(Math.random () * (max - min)) + min;
}

Vue.createApp({
    data () {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        };
    },
    computed: {
        monsterBarStyles () {
            if (this.monsterHealth < 20 && this.monsterHealth > 0) {
                return {backgroundColor: "red", width: this.monsterHealth + "%"};
            } else if (this.monsterHealth < 0) {
                return {backgroundColor: "red", width: "0%"};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles () {
            if (this.playerHealth < 20 && this.playerHealth > 0) {
                return {backgroundColor: "red", width: this.playerHealth + "%"};
            } else if (this.playerHealth < 0) {
                return {backgroundColor: "red", width: "0%"};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpacialAttack () {
            return this.currentRound % 3 !== 0;
        },
        fullHealth () {
            return this.playerHealth === 100;
        }
    },
    watch: {
        playerHealth (value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "monster";
            }
        },
        monsterHealth (value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "player";
            }
        },
    },
    methods: {
        startGame () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster () {
            this.currentRound++;
            const attackValue = getRandomValue (5, 12); 
            this.monsterHealth -= attackValue;
            this.addLogMessage("player", "attack", attackValue);
            this.attackPlayer();
        },
        attackPlayer () {
            const attackValue = getRandomValue (8, 15); 
            this.playerHealth -= attackValue;
            this.addLogMessage("monster", "attack", attackValue);
        },
        specialAttack () {
            this.currentRound++;
            const attackValue = getRandomValue (10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage("player", "attack", attackValue);
            this.attackPlayer();
        },
        healPlayer () {
            this.currentRound++;
            const healthValue = getRandomValue (8, 20);
            if (this.playerHealth + healthValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healthValue;
            };
            this.addLogMessage("player", "heal", healthValue);
            this.attackPlayer();
        },
        surrender () {
            this.winner = "monster";
        },
        addLogMessage (who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });
        }
    }
}).mount("#game");