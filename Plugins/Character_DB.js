// BaseDeDatosPactos.js
(() => {
    // Base de datos de personajes
    const charactersData = [
        {
            // ============== Cosas que se reutilizarán del sistema de personajes de rpg maker MZ ==============
            // -------------- Tanto el ID como el interruptor deberan ser iguales --------------
            actorId: 1, // ID del personaje 
            switchId: 1, // Interrruptor , esto ayudara a una función si el personaje está disponible o no , se indica undefined  dado que no deberá afectar al jugador , en caso de lso dem'as se le asignara
            // -------------- Está vacío porque una función tomará el nombre desde el sistema de personajes del juego según el ID, y si se añade uno propio, reemplazará al anterior. --------------
            name: "", // Nombre del personaje
            nickname: "", // Apodo del personaje
            sprite: "Actor1", // Nombre del archivod e imagen en domde yace el sprite del personaje
            // ============== Apartado de sprite del personaje ==============
            spriteStructure: { cols: 4, rows: 2 },  // Define la estructura de la hoja de sprites (cuántos sprites hay en total y cómo están organizados en columnas y filas)
            spritePosition: { col: 1, row: 1 },     // Define la posición del sprite específico dentro de la hoja de sprites.
            gridSize: { width: 48, height: 48 },    // Define el tamaño de cada celda (cuadrícula) que representa una dirección del personaje.
            spriteSize: { width: 144, height: 192 }, // Define el tamaño total del sprite del personaje (calculado a partir de gridSize y las dimensiones del personaje).
            characterFrames: { cols: 3, rows: 4 }, // Columas y filas que posee el sprite
            posicionCharacter: 0, // Dirección en la que el personaje mira (0 = abajo, 1 = izquierda, 2 = derecha, 3 = arriba)
            // ============== Variables que definen al personaje  ==============
            variables: {
                // -------------- Esto es propio del personaje del jugador --------------
                reputacion: 1, // Significa la reputacion del personaje , mientras más alto sea , mayor es la reputacion
                valorRango: 2, // Valor del rango , al llegar a cierta cantidad puntos puede cambiar de titulo
                valorTitulo: 3, // rango del jugador , mientran mas alto sea mas libertad tendrá por el mundo
                // -------------- Estado de salud fisico --------------
                hambre: 4, // Seria el hambre del personaje , a medida que este más cerca del 0 signicia que posee más hambre , en caso sea 100 significa que esta lleno
                sed: 5, // Seria la sed del personaje , a medida que este más cerca del 0 signicia que está sediento , en caso sea 100 significa que esta hidratado
                // -------------- Estado de mental --------------
                estadoAnimo: 6, // Seria el estado de animo del personaje , a medida que este más cerca del 0 signicia que esta más deprimido , en caso sea 100 significa que esta alegre
                estadoCordura: 7, // Seria el estado de cordura del personaje , a medida que este más cerca del 0 signicia que esta más loco , en caso sea 100 significa que esta saludable mentalmente
                // -------------- Relación , esto se usará unicamente en los demás personajes --------------
                atraccion: undefined, // Se pone nulo dado que estamos hablando del personaje principal , no deberia tenerlo
                lujuria: undefined, // Se pone nulo dado que estamos hablando del personaje principal , no deberia tenerlo
                corrupcion: undefined, // Se pone nulo dado que estamos hablando del personaje principal , no deberia tenerlo
            },
            // -------------- Cosas que se remplazarán del sistema de personajes de rpg maker MZ --------------
            rango: "",
            characterDescription: "Es un heroe que salvo a Colussia de la destrucción",
            equipmentDescription: "Posee habilidades sobre naturales de fuego",
            characterLocation: "Se localisa en locussia"

        },
        {
            switchId: 2,
            actorId: 2,
            name: "",
            nickname: "",
            sprite: "Actor1",
            spriteStructure: { cols: 4, rows: 2 },
            spritePosition: { col: 2, row: 1 },
            gridSize: { width: 48, height: 48 },
            spriteSize: { width: 144, height: 192 },
            characterFrames: { cols: 3, rows: 4 },
            posicionCharacter: 0,
            variables: {
                reputacion: undefined,
                valorRango: undefined,
                rangoTitulo: undefined,
                hambre: 11,
                sed: 12,
                estadoAnimo: 13,
                estadoCordura: 14,
                atraccion: 15,
                lujuria: 16,
                corrupcion: 17,
            },
            characterDescription: "Es un perro callejero que le gusta nevegar por las tierras de white haves",
            equipmentDescription: "Posee habilidades curativas",
            characterLocation: "Se localisa en terraria"
        },
        {
            switchId: 3,
            actorId: 3,
            name: "",
            nickname: "",
            sprite: "Actor1",
            spriteStructure: { cols: 4, rows: 2 },
            spritePosition: { col: 3, row: 1 },
            gridSize: { width: 48, height: 48 },
            spriteSize: { width: 144, height: 192 },
            characterFrames: { cols: 3, rows: 4 },
            posicionCharacter: 0,
            variables: {
                reputacion: undefined,
                valorRango: undefined,
                rangoTitulo: undefined,
                hambre: 11,
                sed: 12,
                estadoAnimo: 13,
                estadoCordura: 14,
                atraccion: 15,
                lujuria: 16,
                corrupcion: 17,
            },
            characterDescription: "Es un perro callejero que le gusta nevegar por las tierras de white haves",
            equipmentDescription: "Soy un dragon",
            characterLocation: "Se localisa en minecraft"
        },
        {
            switchId: 4,
            actorId: 4,
            name: "",
            nickname: "",
            sprite: "Actor1",
            spriteStructure: { cols: 4, rows: 2 },
            spritePosition: { col: 4, row: 1 },
            gridSize: { width: 48, height: 48 },
            spriteSize: { width: 144, height: 192 },
            characterFrames: { cols: 3, rows: 4 },
            posicionCharacter: 0,
            variables: {
                reputacion: undefined,
                valorRango: undefined,
                rangoTitulo: undefined,
                hambre: 11,
                sed: 12,
                estadoAnimo: 13,
                estadoCordura: 14,
                atraccion: 15,
                lujuria: 16,
                corrupcion: 17,
            },
            characterDescription: "Es un perro callejero que le gusta nevegar por las tierras de white haves",
            equipmentDescription: "Soy un perrito",
            characterLocation: "Se localisa en dragon city"
        },
        {
            switchId: 5,
            actorId: 5,
            name: "",
            nickname: "",
            sprite: "Actor1",
            spriteStructure: { cols: 4, rows: 2 },
            spritePosition: { col: 1, row: 2 },
            gridSize: { width: 48, height: 48 },
            spriteSize: { width: 144, height: 192 },
            characterFrames: { cols: 3, rows: 4 },
            posicionCharacter: 0,
            variables: {
                reputacion: undefined,
                valorRango: undefined,
                rangoTitulo: undefined,
                hambre: 11,
                sed: 12,
                estadoAnimo: 13,
                estadoCordura: 14,
                atraccion: 15,
                lujuria: 16,
                corrupcion: 17,
            },
            characterDescription: "Es un perro callejero que le gusta nevegar por las tierras de white haves",
            equipmentDescription: "Soy un re:zeroooooooooo",
            characterLocation: "Se localisa en roma"
        },
        {
            switchId: 6,
            actorId: 6,
            name: "",
            nickname: "",
            sprite: "Actor1",
            spriteStructure: { cols: 4, rows: 2 },
            spritePosition: { col: 2, row: 2 },
            gridSize: { width: 48, height: 48 },
            spriteSize: { width: 144, height: 192 },
            characterFrames: { cols: 3, rows: 4 },
            posicionCharacter: 0,
            variables: {
                reputacion: undefined,
                valorRango: undefined,
                rangoTitulo: undefined,
                hambre: 11,
                sed: 12,
                estadoAnimo: 13,
                estadoCordura: 14,
                atraccion: 15,
                lujuria: 16,
                corrupcion: 17,
            },
            characterDescription: "Es un perro callejero que le gusta nevegar por las tierras de white haves",
            equipmentDescription: "Soy un personaje de videojuego",
            characterLocation: "Se localisa en grecia"
        },
        {
            switchId: 7,
            actorId: 7,
            name: "",
            nickname: "",
            sprite: "Actor1",
            spriteStructure: { cols: 4, rows: 2 },
            spritePosition: { col: 3, row: 2 },
            gridSize: { width: 48, height: 48 },
            spriteSize: { width: 144, height: 192 },
            characterFrames: { cols: 3, rows: 4 },
            posicionCharacter: 0,
            variables: {
                reputacion: undefined,
                valorRango: undefined,
                rangoTitulo: undefined,
                hambre: 11,
                sed: 12,
                estadoAnimo: 13,
                estadoCordura: 14,
                atraccion: 15,
                lujuria: 16,
                corrupcion: 17,
            },
            characterDescription: "Es un perro callejero que le gusta nevegar por las tierras de white haves",
            equipmentDescription: "Posee habilidades curativas",
            characterLocation: "Se localisa en futuramaF"
        },
        // Resto de los demas personajes...
    ];

    // Objeto de utilidades para interactuar con la base de datos
    const characters_DB = {
        getCharacterByActorId: function (actorId) {
            return charactersData.find(character => character.actorId === actorId) || null;
        },
        getCharacterByActorId: function (actorId) {
            return charactersData.find(character => character.actorId === actorId) || null;
        },
        getAvailableCharacter: function () {
            return charactersData.find(character => character.switchId === null) || null;
        },
        getActorName: function (actorId) {
            const character = this.getCharacterByActorId(actorId);
            return character ? character.name : "";
        },
        getActorNickname: function (actorId) {
            const character = this.getCharacterByActorId(actorId);
            return character ? character.nickname : "";
        },
        getCharacterSprite: function (character) {
            const {
                sprite,
                spriteStructure,
                spritePosition,
                gridSize,
                spriteSize,
                characterFrames,
                posicionCharacter
            } = character;

            // Ajustar las columnas y filas para que estén basadas en 0
            const col = spritePosition.col - 1; // Restar 1 para convertir a base 0
            const row = spritePosition.row - 1; // Restar 1 para convertir a base 0

            // Calcular la posición del sprite en la hoja de sprites
            const spriteX = col * spriteSize.width;
            const spriteY = row * spriteSize.height;

            // Calcular el tamaño de cada frame dentro del sprite del personaje
            const frameWidth = spriteSize.width / characterFrames.cols;
            const frameHeight = spriteSize.height / characterFrames.rows;

            // Seleccionar el frame quieto (segunda columna) para la dirección correspondiente
            const frameX = 1 * frameWidth; // Frame quieto (segunda columna)
            const frameY = posicionCharacter * frameHeight; // Fila correspondiente a la dirección

            return {
                sprite,
                spriteX,
                spriteY,
                frameX,
                frameY,
                frameWidth,
                frameHeight
            };
        },
        getCharacterVariables: function (actorId) {
            const character = this.getCharacterByActorId(actorId);
            return character ? character.variables : {};
        },
        getCharactercharacterDescription: function (actorId) {
            const character = this.getCharacterByActorId(actorId);
            return character ? character.characterDescription : "";
        },

        getAllCharacters: function () {
            return charactersData; // Devuelve la base de datos completa
        }
    };

    // Exponer la base de datos y las utilidades en el objeto global `window`
    window.charactersData = charactersData;
    window.characters_DB = characters_DB;
})();