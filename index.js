const MAX_LIFE = 100;
const PLAYER_BASE_ATTACK = 10;
const MONSTER_BASE_ATTACK = 10;

const getRandomBetween = (min,max) => {
    return Math.floor(Math.random() * (max-min) + min);
};

new Vue({
    el: '#app',
    data: {
        life: {
            player: MAX_LIFE,
            monster: MAX_LIFE,
        },
        log: [],
        runGame: true,
    },
    methods: {
        lifeStyle(entity){
            return {
                'background-color': this.life[entity]>MAX_LIFE*0.25?'green':'red',
                'width': (this.life[entity]/MAX_LIFE)*100 + '%',
            };
        },
        run(){
            if(this.life.player===0){
                this.generateLog('game','Player is dead!');
                this.generateLog('game','Monster is the winner!');
                this.runGame = false;
            }
            if(this.life.monster===0){
                this.generateLog('game','Monster is dead!');
                this.generateLog('game','Player is the winner!');
                this.runGame = false;
            }
            return this.runGame;
        },
        newGame(){
            this.log.length = 0;
            this.life.player = MAX_LIFE;
            this.life.monster = MAX_LIFE;
            this.runGame = true;
        },
        generateLog(entity,text){
            this.log.unshift({entity,text});
        },
        removeHealth(entity,target,value) {
            if(this.life[target]-value<0){
                this.life[target]=0;
            }else{
                this.life[target]-=value;
            }
            this.generateLog(entity,`${entity} deals ${value} damage to ${target}`);
        },
        giveHealth(entity,value) {
            if(this.life[entity]-value>MAX_LIFE){
                this.life[entity]=MAX_LIFE;
            }else{
                this.life[entity]+=value;
            }
            this.generateLog(entity,`${entity} recovered ${value} health`);
        },
        monsterAttack(){
            if(this.run()){
                this.removeHealth('monster','player',getRandomBetween(MONSTER_BASE_ATTACK*0.5,MONSTER_BASE_ATTACK*1.5));
                this.run();
            }
        },
        attack(){
            this.removeHealth('player','monster',getRandomBetween(PLAYER_BASE_ATTACK*0.5,PLAYER_BASE_ATTACK*1.5));
            this.monsterAttack();
        },
        specialAttack(){
            this.removeHealth('player','monster',getRandomBetween(PLAYER_BASE_ATTACK*1,PLAYER_BASE_ATTACK*2));
            this.monsterAttack();
        },
        heal(){
            this.giveHealth('player',getRandomBetween(PLAYER_BASE_ATTACK*0.5,PLAYER_BASE_ATTACK*1.5));
            this.monsterAttack();
        },
        escape(){
            this.generateLog('game','Player has escaped!');
            this.generateLog('game','Monster is the winner!');
            this.runGame = false;
        },
    },
});