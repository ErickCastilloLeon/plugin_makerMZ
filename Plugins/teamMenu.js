(() => {
    // Verificar que el plugin de la base de datos esté cargado
    if (!window.characters_DB) {
        throw new Error("El plugin 'characterBada_HPK' debe cargarse antes que 'SistemaDeTeamMenu'.");
    }

    // Usar las funciones del plugin de la base de datos
    const characters_DB = window.characters_DB;
    const Window_DB = window.Window_DB;

    // Alias seguro para createCommandWindow
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this); // Llama a la función original
        this.addTeamMenuCommand(); // Agrega la opción de "TeamMenu"
    };

    // Función para añadir el comando "TeamMenu"
    Scene_Menu.prototype.addTeamMenuCommand = function () {
        this._commandWindow.setHandler('TeamMenu', this.commandTeamMenu.bind(this));
    };

    // Extender addOriginalCommands en lugar de sobrescribirlo
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_addOriginalCommands.call(this); // Llama a la función original
        this.addCommand('Equipos', 'TeamMenu'); // Agrega el comando "TeamMenu"
    };

    // Crear la escena del menú de TeamMenu
    function Scene_TeamMenu_HPK() {
        this.initialize.apply(this, arguments);
    }

    Scene_TeamMenu_HPK.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_TeamMenu_HPK.prototype.constructor = Scene_TeamMenu_HPK;

    // Cambiar a la escena de TeamMenu cuando se seleccione la opción
    Scene_Menu.prototype.commandTeamMenu = function () {
        SceneManager.push(Scene_TeamMenu_HPK);
    };

    Scene_TeamMenu_HPK.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
        this.selectedSection = 'contratosActivo';
        this.cursor_SlotIndexAct = 0;
        this.cursor_SlotIndexDispo = 0;
        this.startIndexDispo = 0;
        this.visibleSlotsDispo = 5;
        this.ChaAct_toDispo = null; // Inicializa la variable
        this.ChaDispo_toAct = null; // Inicializa la variable
        this._inputCooldown = 0; // Flag para evitar múltiples detecciones
        this._lastCursorIndexAct = 0; // Almacena la última posición del cursor en "Personajes Activos"HPK
    };

    Scene_TeamMenu_HPK.prototype.createSections = function () {
        // Personajes Activos
        this._contratosActivo = this.createPersonajeActivoSection();
        this.addChild(this._contratosActivo);
        // Personajes Disponibles
        this._contratosDisponible = this.createPersonajeDisponibleSection();
        this.addChild(this._contratosDisponible);
        // Relación Personaje
        this._relacionPersonaje = this.createEstadisticaPersonajeSection();
        this.addChild(this._relacionPersonaje);
        // Descripción del Personaje
        this._descripcionPersonaje = this.createDescripcionPersonajeSection();
        this.addChild(this._descripcionPersonaje);
    };

    // --------------- Crear sección de Personajes Activos ---------------
    Scene_TeamMenu_HPK.prototype.createPersonajeActivoSection = function () {
        const section = new Sprite();
        section.bitmap = new Bitmap(600, 360);
        section.x = 0;
        section.y = 0;

        const windowImage = ImageManager.loadSystem('Window');// Cargar la imagen Window.png
<<<<<<< HEAD
        Window_DB.drawBackground(section.bitmap, windowImage);// Dibujar el fondo usando Window_DB
        Window_DB.drawBorders(section.bitmap, windowImage); // Dibujar bordes usando Window_DB
        Window_DB.drawCornerIcons(section.bitmap, windowImage);// Dibujar iconos esquineros usando Window_DB
=======
        WindowDataAPI.drawBackground(section.bitmap, windowImage);// Dibujar el fondo usando WindowDataAPI
        WindowDataAPI.drawBorders(section.bitmap, windowImage); // Dibujar bordes usando WindowDataAPI
        WindowDataAPI.drawCornerIcons(section.bitmap, windowImage);// Dibujar iconos esquineros usando WindowDataAPI
>>>>>>> origin/main

        // Título de la sección
        const titleActivos = new Sprite(new Bitmap(500, 35));
        titleActivos.bitmap.fillAll('rgba(0, 0, 0, 0.7)');
        titleActivos.bitmap.drawText("Personajes Activos", 0, 0, 500, 35, 'center');
        titleActivos.x = (600 - 500) / 2;
        titleActivos.y = 35;
        titleActivos.protected = true; // Marcar como protegido
        section.addChild(titleActivos);

        // Nota informativa
        const noteActivos = new Sprite(new Bitmap(500, 25));
        noteActivos.bitmap.fillAll('rgba(0, 0, 0, 0.7)');
        noteActivos.bitmap.drawText("Solo se puede invitar a 4 personajes al equipo", 0, 0, 500, 25, 'center');
        noteActivos.x = 50;
        noteActivos.y = 300;
        noteActivos.protected = true; // Marcar como protegido
        section.addChild(noteActivos);

        // Casillas de personajes
        this.createCharacterSlots_ConAct(section);

        return section;
    };

    // --------------- Crear sección de Personajes disponibles ---------------
    Scene_TeamMenu_HPK.prototype.createPersonajeDisponibleSection = function () {
        const section = new Sprite();
        section.bitmap = new Bitmap(400, 360);
        section.x = 0;
        section.y = 360;

        const windowImage = ImageManager.loadSystem('Window');// Cargar la imagen Window.png
<<<<<<< HEAD
        Window_DB.drawBackground(section.bitmap, windowImage);// Dibujar el fondo usando Window_DB
        Window_DB.drawBorders(section.bitmap, windowImage); // Dibujar bordes usando Window_DB
        Window_DB.drawCornerIcons(section.bitmap, windowImage);// Dibujar iconos esquineros usando Window_DB
=======
        WindowDataAPI.drawBackground(section.bitmap, windowImage);// Dibujar el fondo usando WindowDataAPI
        WindowDataAPI.drawBorders(section.bitmap, windowImage); // Dibujar bordes usando WindowDataAPI
        WindowDataAPI.drawCornerIcons(section.bitmap, windowImage);// Dibujar iconos esquineros usando WindowDataAPI
>>>>>>> origin/main

        // Título de la sección
        const titleDisponibles = new Sprite(new Bitmap(345, 35));
        titleDisponibles.bitmap.fillAll('rgba(0, 0, 0, 0.8)');
        titleDisponibles.bitmap.drawText("Personajes Disponibles", 0, 0, 345, 35, 'center');
        titleDisponibles.x = (400 - 345) / 2;
        titleDisponibles.y = 35;
        titleDisponibles.protected = true; // Marcar como protegido
        section.addChild(titleDisponibles);

        // Casillas de personajes
        this.createCharacterSlots_ConDispo(section);

        return section;
    };

    Scene_TeamMenu_HPK.prototype.refreshCharacterSlotsDispo = function () {
        const start = this.startIndexDispo;
        const end = start + this.visibleSlotsDispo;

        // Ocultar todas las casillas primero
        this.characterSlotsDispo.forEach((slot, index) => {
            slot.visible = (index >= start && index < end);
        });

        // Posicionar las casillas visibles
        this.characterSlotsDispo.forEach((slot, index) => {
            if (slot.visible) {
                slot.y = 85 + ((index - start) * 50); // Ajustar la posición Y espacio entre casillas
            }
        });
    };

    // --------------- Crear sección de relación de contratos ---------------
    Scene_TeamMenu_HPK.prototype.createEstadisticaPersonajeSection = function () {
        const section = new Sprite();
        section.bitmap = new Bitmap(680, 360);
        section.x = 600;
        section.y = 0;

        const windowImage = ImageManager.loadSystem('Window');// Cargar la imagen Window.png
<<<<<<< HEAD
        Window_DB.drawBackground(section.bitmap, windowImage);// Dibujar el fondo usando Window_DB
        Window_DB.drawBorders(section.bitmap, windowImage); // Dibujar bordes usando Window_DB
        Window_DB.drawCornerIcons(section.bitmap, windowImage);// Dibujar iconos esquineros usando Window_DB
=======
        WindowDataAPI.drawBackground(section.bitmap, windowImage);// Dibujar el fondo usando WindowDataAPI
        WindowDataAPI.drawBorders(section.bitmap, windowImage); // Dibujar bordes usando WindowDataAPI
        WindowDataAPI.drawCornerIcons(section.bitmap, windowImage);// Dibujar iconos esquineros usando WindowDataAPI
>>>>>>> origin/main

        // Título de la sección
        const title = new Sprite(new Bitmap(345, 35));
        title.bitmap.fillAll('rgba(0, 0, 0, 0.7)');
        title.bitmap.drawText("Estadisticas del personaje", 0, 0, 345, 35, 'center');
        title.x = (680 - 345) / 2; // Centrado dentro de section (675 px de ancho)
        title.y = 35;
        section.addChild(title);

        return section;
    };

    // --------------- Crear sección de descripcion de contrato ---------------
    Scene_TeamMenu_HPK.prototype.createDescripcionPersonajeSection = function () {
        const section = new Sprite();
        section.bitmap = new Bitmap(880, 360);
        section.x = 400;
        section.y = 360;

        const windowImage = ImageManager.loadSystem('Window');// Cargar la imagen Window.png
<<<<<<< HEAD
        Window_DB.drawBackground(section.bitmap, windowImage);// Dibujar el fondo usando Window_DB
        Window_DB.drawBorders(section.bitmap, windowImage); // Dibujar bordes usando Window_DB
        Window_DB.drawCornerIcons(section.bitmap, windowImage);// Dibujar iconos esquineros usando Window_DB
=======
        WindowDataAPI.drawBackground(section.bitmap, windowImage);// Dibujar el fondo usando WindowDataAPI
        WindowDataAPI.drawBorders(section.bitmap, windowImage); // Dibujar bordes usando WindowDataAPI
        WindowDataAPI.drawCornerIcons(section.bitmap, windowImage);// Dibujar iconos esquineros usando WindowDataAPI
>>>>>>> origin/main

        // Título de la sección
        const title = new Sprite(new Bitmap(345, 35));
        title.bitmap.fillAll('rgba(0, 0, 0, 0.7)');
        title.bitmap.drawText("Descripcion del personaje", 0, 0, 345, 35, 'center');
        title.x = (880 - 345) / 2; // Centrado dentro de section (880px de ancho)
        title.y = 35;
        section.addChild(title);

        // Texto de la descripción
        this._descripcionText = new Sprite(new Bitmap(580, 250)); // Área de texto
        this._descripcionText.x = (880 - 600) / 2;
        this._descripcionText.y = 100;
        section.addChild(this._descripcionText);

        return section;
    };

    Sprite.prototype.removeUnprotectedChildren = function () {
        for (let i = this.children.length - 1; i >= 0; i--) {
            if (!this.children[i].protected) {
                this.removeChild(this.children[i]);
            }
        }
    };

    // =============== Sistema de navegación ===============

    // Función para navegar por los slots
    Scene_TeamMenu_HPK.prototype.navigateList = function (direction) {
        const currentIndex = this.characterSlots.findIndex(slot => slot.isCursor);
        const newIndex = (currentIndex + direction + this.characterSlots.length) % this.characterSlots.length;
        this.cursor_CharacterSlot(newIndex);
    };

    // Para las casillas en Personajes Activos
    Scene_TeamMenu_HPK.prototype.cursor_CharacterSlot = function (index) {
        this.characterSlots.forEach((slot, i) => {
            slot.isCursor = (i === index);
        });
        this.cursor_SlotIndexAct = index; // Almacenar el índice del slot seleccionado
    };

    // Para las casillas en Personajes Disponibles
    Scene_TeamMenu_HPK.prototype.cursor_CharacterSlotDispo = function (index) {
        this.characterSlotsDispo.forEach((slot, i) => {
            slot.isCursor = (i === index);
        });
        this.cursor_SlotIndexDispo = index; // Almacenar el índice del slot seleccionado
    };

    // Función de navegación genérica
    Scene_TeamMenu_HPK.prototype.navigateList = function (direction, section) {
        if (section === 'contratosActivo') {
            this.navigateConAct(direction);
        } else if (section === 'contratosDisponible') {
            this.navigateConDispo(direction);
        }
    };

    // Navegación para Personajes Activos
    Scene_TeamMenu_HPK.prototype.navigateConAct = function (direction) {
        const currentIndex = this.characterSlots.findIndex(slot => slot.isCursor);
        const newIndex = (currentIndex + direction + this.characterSlots.length) % this.characterSlots.length;
        this.cursor_CharacterSlot(newIndex);
        this.Cursor_highlightSlot(); // Resaltar la casilla seleccionada
    };

    // Navegación para Personajes Disponibles
    Scene_TeamMenu_HPK.prototype.navigateConDispo = function (direction) {
        const totalSlots = this.characterSlotsDispo.length;
        const newIndex = (this.cursor_SlotIndexDispo + direction + totalSlots) % totalSlots;

        // Actualizar el índice seleccionado
        this.cursor_CharacterSlotDispo(newIndex);

        // Ajustar el scroll si el índice seleccionado está fuera de la ventana visible
        if (newIndex < this.startIndexDispo) {
            this.startIndexDispo = newIndex; // Desplazar hacia arriba
        } else if (newIndex >= this.startIndexDispo + this.visibleSlotsDispo) {
            this.startIndexDispo = newIndex - this.visibleSlotsDispo + 1; // Desplazar hacia abajo
        }

        // Actualizar la visualización de las casillas
        this.refreshCharacterSlotsDispo();
    };

    // =============== Sistema de sprite dentro de casillas ===============

    // Crear las casillas de personajes para Personajes Disponibles
    Scene_TeamMenu_HPK.prototype.createCharacterSlots_ConDispo = function (parent) {
        this.characterSlotsDispo = [];

        // Obtener todos los personajes de la base de datos
        const allCharacters = characters_DB.getAllCharacters();

        // Obtener los miembros actuales del equipo
        const partyMembers = $gameParty.members();

        // Filtrar personajes que no están en el equipo y tienen un interruptor asignado
        const filteredCharacters = allCharacters.filter(characterData => {
            const isInParty = partyMembers.some(member => member.actorId() === characterData.actorId);
            return characterData.switchId !== undefined && !isInParty;
        });

        // Crear casillas para los personajes filtrados
        filteredCharacters.forEach((characterData, index) => {
            const characterSlot = this.createCharacterSlot_ConDispo(characterData, 25, 85 + (index * (48))); // Espacio de 2 píxeles entre casillas
            parent.addChild(characterSlot);
            this.characterSlotsDispo.push(characterSlot);

            // Deshabilitar o resaltar la casilla según el estado del interruptor
            if (!$gameSwitches.value(characterData.switchId)) {
                characterSlot.opacity = 128; // Reducir la opacidad si el interruptor no está activado
            }
        });

        // Resaltar la primera casilla de "Personajes Disponibles" por defecto
        if (this.characterSlotsDispo.length > 0) {
            this.cursor_CharacterSlotDispo(0);
            this.refreshCharacterSlotsDispo(); // Ajustar la visualización inicial
        }
    };

    // Crear una casilla de personaje para Personajes Disponibles
    Scene_TeamMenu_HPK.prototype.createCharacterSlot_ConDispo = function (characterData, x, y) {
        const slot = new Sprite();
        slot.bitmap = new Bitmap(345, 48); // Ancho original (345), alto ajustado (48)
        slot.bitmap.fillAll('rgba(15, 11, 11, 0.5)');
        slot.bitmap.strokeRect(0, 0, 345, 48, 'white'); // Borde blanco
        slot.x = x;
        slot.y = y;

        if (characterData) {
            // Obtener la información del sprite
            const spriteInfo = characters_DB.getCharacterSprite(characterData);

            // Crear el sprite del personaje
            const sprite = new Sprite(ImageManager.loadCharacter(characterData.sprite));
            sprite.setFrame(spriteInfo.spriteX + spriteInfo.frameX, spriteInfo.spriteY + spriteInfo.frameY, spriteInfo.frameWidth, spriteInfo.frameHeight);

            // Ajustar la escala del sprite para que el alto sea 48 píxeles
            const scale = 48 / spriteInfo.frameHeight;
            sprite.scale.set(scale, scale);

            // Posicionar el sprite dentro de la casilla
            sprite.x = 10;
            sprite.y = 0;

            // Añadir el sprite a la casilla
            slot.addChild(sprite);

            // Obtener el nombre del personaje desde $dataActors
            const actor = $dataActors[characterData.actorId];
            const characterName = actor ? actor.name : "Sin nombre";

            // Añadir el nombre del personaje
            const text = new Sprite(new Bitmap(345, 48));
            text.bitmap.drawText(characterName, 60, 0, 345, 48, 'left');
            slot.addChild(text);

            // Si el interruptor no está activado, atenuar la casilla
            if (!$gameSwitches.value(characterData.switchId)) {
                slot.opacity = 128; // Reducir la opacidad si el interruptor no está activado
            }
        } else {
            // Añadir "Vacío" si no hay personaje
            const text = new Sprite(new Bitmap(345, 48));
            text.bitmap.drawText("Vacío", 60, 0, 345, 48, 'left');
            slot.addChild(text);
        }

        return slot;
    };

    // Crear una casilla de personaje para Personajes Activos
    Scene_TeamMenu_HPK.prototype.createCharacterSlot_ConAct = function (character, x, y) {
        const slot = new Sprite();
        slot.bitmap = new Bitmap(500, 48); // Ancho original (500), alto ajustado (48)
        slot.bitmap.fillAll('rgba(0, 0, 0, 0.8)');
        slot.bitmap.strokeRect(0, 0, 500, 48, 'white'); // Borde blanco
        slot.x = x;
        slot.y = y;

        if (character) {
            // Obtener los datos del personaje desde la base de datos
            const characterData = characters_DB.getCharacterByActorId(character.actorId());

            if (characterData) {
                // Obtener la información del sprite
                const spriteInfo = characters_DB.getCharacterSprite(characterData);

                // Crear el sprite del personaje
                const sprite = new Sprite(ImageManager.loadCharacter(characterData.sprite));
                sprite.setFrame(spriteInfo.spriteX + spriteInfo.frameX, spriteInfo.spriteY + spriteInfo.frameY, spriteInfo.frameWidth, spriteInfo.frameHeight);

                // Ajustar la escala del sprite para que el alto sea 48 píxeles
                const scale = 48 / spriteInfo.frameHeight;
                sprite.scale.set(scale, scale);

                // Posicionar el sprite dentro de la casilla
                sprite.x = 10;
                sprite.y = 0;

                // Añadir el sprite a la casilla
                slot.addChild(sprite);
            }
        }

        // Añadir el nombre del personaje o "Vacio" si no hay personaje
        const text = new Sprite(new Bitmap(500, 48));
        text.bitmap.drawText(character ? character.name() : "Vacio", 60, 0, 500, 48, 'left');
        slot.addChild(text);

        return slot;
    };

    // Crear las casillas de personajes
    Scene_TeamMenu_HPK.prototype.createCharacterSlots_ConAct = function (parent) {
        this.characterSlots = [];

        // Obtener los miembros del equipo
        const members = $gameParty.members();

        // Filtrar personajes que tienen un interruptor asignado y que esté activado
        const filteredMembers = members.filter(member => {
            const characterData = characters_DB.getCharacterByActorId(member.actorId());
            if (characterData && characterData.switchId !== undefined) {
                return $gameSwitches.value(characterData.switchId); // Verificar si el interruptor está activado
            }
            return false;
        });

        // Crear casillas para los personajes filtrados
        for (let i = 0; i < 4; i++) {
            const character = filteredMembers[i] || null; // Obtener el personaje o null si no hay más
            const characterSlot = this.createCharacterSlot_ConAct(character, 50, 85 + (i * (48 + 5))); // Espacio entre casillas
            parent.addChild(characterSlot);
            this.characterSlots.push(characterSlot);
        }

        // Resaltar la primera casilla de "Personajes Activos" por defecto
        if (this.characterSlots.length > 0) {
            this.characterSlots[0].isCursor = true;
        }
    };

    // =============== Sistema de resaltado en casillas ===============

    // Función para resaltar la casilla donde yace el cursor con un borde interior
    Scene_TeamMenu_HPK.prototype.Cursor_highlightSlot = function () {
        // Resaltar casillas en "Personajes Activos"
        if (this.selectedSection === 'contratosActivo') {
            this.characterSlots.forEach((slot, i) => {
                if (slot.isCursor) {
                    slot.bitmap.clear();
                    slot.bitmap.fillAll('rgba(0, 0, 0, 0.8)');
                    // Dibujar un borde de 4 píxeles interior con color rgba
                    const borderColor = 'rgba(255, 215, 0, 0.8)'; // Color dorado con transparencia
                    for (let j = 0; j < 4; j++) {
                        slot.bitmap.fillRect(j, j, 500 - 2 * j, 1, borderColor); // Borde superior
                        slot.bitmap.fillRect(j, 48 - j - 1, 500 - 2 * j, 1, borderColor); // Borde inferior
                        slot.bitmap.fillRect(j, j, 1, 48 - 2 * j, borderColor); // Borde izquierdo
                        slot.bitmap.fillRect(500 - j - 1, j, 1, 48 - 2 * j, borderColor); // Borde derecho
                    }
                } else {
                    slot.bitmap.clear();
                    slot.bitmap.fillAll('rgba(0, 0, 0, 0.8)');
                    slot.bitmap.strokeRect(0, 0, 500, 48, 'white'); // Borde blanco
                }
            });

            // Desmarcar todas las casillas en "Personajes Disponibles"
            this.characterSlotsDispo.forEach((slot, i) => {
                slot.bitmap.clear();
                slot.bitmap.fillAll('rgba(0, 0, 0, 0.8)');
                slot.bitmap.strokeRect(0, 0, 345, 48, 'white'); // Borde blanco
            });
        }

        // Resaltar casillas en "Personajes Disponibles"
        if (this.selectedSection === 'contratosDisponible') {
            this.characterSlotsDispo.forEach((slot, i) => {
                if (slot.isCursor && slot.visible) {
                    slot.bitmap.clear();
                    slot.bitmap.fillAll('rgba(0, 0, 0, 0.8)');
                    // Dibujar un borde de 4 píxeles interior con color rgba
                    const borderColor = 'rgba(255, 215, 0, 0.8)'; // Color dorado con transparencia
                    for (let j = 0; j < 4; j++) {
                        slot.bitmap.fillRect(j, j, 345 - 2 * j, 1, borderColor); // Borde superior
                        slot.bitmap.fillRect(j, 48 - j - 1, 345 - 2 * j, 1, borderColor); // Borde inferior
                        slot.bitmap.fillRect(j, j, 1, 48 - 2 * j, borderColor); // Borde izquierdo
                        slot.bitmap.fillRect(345 - j - 1, j, 1, 48 - 2 * j, borderColor); // Borde derecho
                    }
                } else if (slot.visible) {
                    slot.bitmap.clear();
                    slot.bitmap.fillAll('rgba(0, 0, 0, 0.8)');
                    slot.bitmap.strokeRect(0, 0, 345, 48, 'white'); // Borde blanco
                }
            });

            // Desmarcar todas las casillas en "Personajes Activos"
            this.characterSlots.forEach((slot, i) => {
                slot.bitmap.clear();
                slot.bitmap.fillAll('rgba(0, 0, 0, 0.8)');
                slot.bitmap.strokeRect(0, 0, 500, 48, 'white'); // Borde blanco
            });
        }
    };

    Scene_TeamMenu_HPK.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createSections();

        // Resaltar la primera casilla de la sección activa
        this.highlightFirstSlot();
    };

    Scene_TeamMenu_HPK.prototype.highlightFirstSlot = function () {
        if (this.selectedSection === 'contratosActivo' && this.characterSlots.length > 0) {
            this.characterSlots[0].isCursor = true;
            this.Cursor_highlightSlot(); // Aplicar el resaltado
        } else if (this.selectedSection === 'contratosDisponible' && this.characterSlotsDispo.length > 0) {
            this.characterSlotsDispo[0].isCursor = true;
            this.Cursor_highlightSlot(); // Aplicar el resaltado
        }
    };

    // =============== Sistema de actualización ===============

    Scene_TeamMenu_HPK.prototype.getCharacterDataForSlotDispo = function (index) {
        // Obtener todos los personajes de la base de datos
        const allCharacters = characters_DB.getAllCharacters();

        // Obtener los miembros actuales del equipo
        const partyMembers = $gameParty.members();

        // Filtrar personajes que no están en el equipo y tienen un interruptor asignado
        const filteredCharacters = allCharacters.filter(characterData => {
            const isInParty = partyMembers.some(member => member.actorId() === characterData.actorId);
            return characterData.switchId !== undefined && !isInParty;
        });

        // Devolver el personaje en el índice especificado
        return filteredCharacters[index] || null;
    };

    // Actualiza la función 'update' para llamar a la función de resaltado
    Scene_TeamMenu_HPK.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);

        // Actualizar la variable 299 con el ID del personaje seleccionado
        this.updateCursorDescriptionVariable();

        // Actualizar la descripción del contrato
        this.updateDescripcionPersonaje();

        // Reducir el cooldown del input si es mayor que 0
        if (this._inputCooldown > 0) {
            this._inputCooldown--;
        }

        // Navegación por la lista de personajes (teclas arriba/abajo)
        if (Input.isTriggered('down')) {
            this.navigateList(1, this.selectedSection);
            AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
        } else if (Input.isTriggered('up')) {
            this.navigateList(-1, this.selectedSection);
            AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
        }

        // Selección de personaje en Personajes Activos (ENTER o Z)
        if (this.selectedSection === 'contratosActivo' && Input.isTriggered('ok') && this._inputCooldown === 0) {
            const selectedCharacter = this.getCharacterForSlot(this.cursor_SlotIndexAct);
            if (selectedCharacter && selectedCharacter.actorId() !== 1) { // Verificar que no sea el personaje con ID 1
                this.ChaAct_toDispo = selectedCharacter.actorId(); // Asigna el ID del personaje seleccionado
                $gameVariables.setValue(302, this.ChaAct_toDispo); // Asigna el valor a la variable 302

                // Guardar la posición actual del cursor
                this._lastCursorIndexAct = this.cursor_SlotIndexAct;

                // Cambiar a "Personajes Disponibles"
                this.selectedSection = 'contratosDisponible';
                this.cursor_CharacterSlotDispo(0); // Posicionar el cursor en la primera casilla
                this.refreshCharacterSlotsDispo(); // Actualizar la visualización
                AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });

                // Activar el cooldown del input
                this._inputCooldown = 10; // Ajusta este valor según sea necesario
            } else if (!selectedCharacter) {
                // Si la casilla está vacía, permitir seleccionar un personaje en "Personajes Disponibles"
                this.ChaAct_toDispo = 0; // Indicar que la casilla está vacía
                $gameVariables.setValue(302, 0); // Asignar 0 a la variable 302

                // Guardar la posición actual del cursor
                this._lastCursorIndexAct = this.cursor_SlotIndexAct;

                // Cambiar a "Personajes Disponibles"
                this.selectedSection = 'contratosDisponible';
                this.cursor_CharacterSlotDispo(0); // Posicionar el cursor en la primera casilla
                this.refreshCharacterSlotsDispo(); // Actualizar la visualización
                AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });

                // Activar el cooldown del input
                this._inputCooldown = 10; // Ajusta este valor según sea necesario
            } else {
                // Reproducir un sonido de error si se intenta seleccionar al personaje con ID 1
                AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
            }
        }

        // Quitar un personaje del equipo (Shift)
        if (this.selectedSection === 'contratosActivo' && Input.isTriggered('shift') && this._inputCooldown === 0) {
            const selectedCharacter = this.getCharacterForSlot(this.cursor_SlotIndexAct);

            if (selectedCharacter && selectedCharacter.actorId() !== 1) { // Verificar que no sea el personaje con ID 1
                // Guardar la posición actual del cursor
                const currentCursorPosition = this.cursor_SlotIndexAct;

                // Remover al personaje del equipo
                $gameParty.removeActor(selectedCharacter.actorId());

                // Actualizar las secciones del menú
                this.refreshSections();

                // Mantener el cursor en la misma posición, si es posible
                if (currentCursorPosition >= this.characterSlots.length) {
                    // Si la posición del cursor es mayor que el número de casillas disponibles, moverlo a la última posición
                    this.cursor_SlotIndexAct = Math.max(0, this.characterSlots.length - 1);
                } else {
                    // Mantener el cursor en la misma posición
                    this.cursor_SlotIndexAct = currentCursorPosition;
                }

                // Resaltar la casilla seleccionada
                this.cursor_CharacterSlot(this.cursor_SlotIndexAct);
                this.Cursor_highlightSlot();

                // Reproducir sonido
                AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });

                // Activar el cooldown del input
                this._inputCooldown = 10; // Ajusta este valor según sea necesario
            } else {
                // Reproducir un sonido de error si se intenta eliminar al personaje con ID 1
                AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
            }
        }

        // Selección de personaje en Personajes Disponibles (ENTER o Z)
        if (this.selectedSection === 'contratosDisponible' && Input.isTriggered('ok') && this._inputCooldown === 0) {
            const selectedCharacterData = this.getCharacterDataForSlotDispo(this.cursor_SlotIndexDispo);

            // Verificar si el interruptor del personaje está activado
            if (selectedCharacterData && $gameSwitches.value(selectedCharacterData.switchId)) {
                this.ChaDispo_toAct = selectedCharacterData.actorId; // Asigna el ID del personaje seleccionado
                $gameVariables.setValue(303, this.ChaDispo_toAct); // Asigna el valor a la variable 303

                // Cambiar a "Personajes Activos" después de seleccionar un personaje
                this.selectedSection = 'contratosActivo';

                // Obtener el ID del personaje a remover (si existe)
                const actorIdToRemove = $gameVariables.value(302); // ID del personaje a remover
                const actorIdToAdd = $gameVariables.value(303); // ID del personaje a añadir

                // Verificar que el personaje a remover no sea el personaje con ID 1
                if (actorIdToRemove !== 1) {
                    // Obtener la lista de miembros del equipo
                    const partyMembers = $gameParty.members();

                    // Encontrar la posición del personaje a remover (si existe)
                    const indexToReplace = partyMembers.findIndex(member => member.actorId() === actorIdToRemove);

                    if (actorIdToAdd !== 0) { // Solo proceder si se seleccionó un personaje en "Personajes Disponibles"
                        if (indexToReplace !== -1) {
                            // Remover al personaje actual de la lista de miembros del equipo
                            $gameParty.removeActor(actorIdToRemove);

                            // Añadir al nuevo personaje en la misma posición
                            $gameParty._actors.splice(indexToReplace, 0, actorIdToAdd);
                        } else {
                            // Si no hay personaje en la casilla seleccionada, simplemente añadir al nuevo personaje
                            $gameParty.addActor(actorIdToAdd);
                        }
                    }
                } else {
                    // Reproducir un sonido de error si se intenta intercambiar al personaje con ID 1
                    AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
                }

                // --------------- Reseteo de variables ---------------
                this.ChaDispo_toAct = 0; // Reseteo
                this.ChaAct_toDispo = 0; // Reseteo
                $gameVariables.setValue(302, 0); // Asigna 0 a la variable 302
                $gameVariables.setValue(303, 0); // Asigna 0 a la variable 303

                // Actualizar las secciones del menú
                this.refreshSections();

                // Posicionar el cursor en la primera casilla
                this.cursor_CharacterSlot(0);
                AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });

                // Activar el cooldown del input
                this._inputCooldown = 10; // Ajusta este valor según sea necesario
            } else {
                // Reproducir un sonido de error si el interruptor no está activado
                AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
            }
        }

        //---- Cerrar menú ----------------
        if ((Input.isTriggered('cancel') || TouchInput.isCancelled()) && this.selectedSection === 'contratosDisponible') {
            // Restaurar la posición del cursor en "Personajes Activos"
            this.cursor_CharacterSlot(this._lastCursorIndexAct);

            // Cambiar a "Personajes Activos"
            this.selectedSection = 'contratosActivo';
            this.ChaDispo_toAct = 0; // Reseteo
            $gameVariables.setValue(302, 0); // Asigna 0 a la variable 302
            this.refreshCharacterSlotsDispo(); // Actualizar la visualización
            AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
        } else if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
            SceneManager.pop();
            AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
        }

        // Resaltar la casilla seleccionada
        this.Cursor_highlightSlot();
    };

    Scene_TeamMenu_HPK.prototype.refreshSections = function () {
        this._contratosActivo.removeUnprotectedChildren();
        this._contratosDisponible.removeUnprotectedChildren();

        // Volver a crear las secciones
        this.createCharacterSlots_ConAct(this._contratosActivo);
        this.createCharacterSlots_ConDispo(this._contratosDisponible);

        // Resaltar la primera casilla de la sección activa
        this.highlightFirstSlot();
    };

    Scene_TeamMenu_HPK.prototype.getCharacterForSlot = function (index) {
        // Obtener los miembros del equipo
        const members = $gameParty.members();

        // Devolver el personaje en el índice especificado
        return members[index] || null;
    };

    Scene_TeamMenu_HPK.prototype.refreshCharacterSprites = function () {
        // Actualizar sprites en "Personajes Activos"
        this.characterSlots.forEach(slot => {
            const sprite = slot.children.find(child => child instanceof Sprite);
            if (sprite) {
                slot.removeChild(sprite);
            }
        });

        this.characterSlots.forEach((slot, index) => {
            const character = this.getCharacterForSlot(index);
            if (character) {
                const characterData = characters_DB.getCharacterByActorId(character.actorId());
                if (characterData) {
                    const spriteInfo = characters_DB.getCharacterSprite(characterData);
                    const sprite = new Sprite(ImageManager.loadCharacter(characterData.sprite));
                    sprite.setFrame(spriteInfo.spriteX + spriteInfo.frameX, spriteInfo.spriteY + spriteInfo.frameY, spriteInfo.frameWidth, spriteInfo.frameHeight);
                    const scale = 48 / spriteInfo.frameHeight;
                    sprite.scale.set(scale, scale);
                    sprite.x = 10;
                    sprite.y = 0;
                    slot.addChild(sprite);
                }
            }
        });

        // Actualizar sprites en "Personajes Disponibles"
        this.characterSlotsDispo.forEach(slot => {
            const sprite = slot.children.find(child => child instanceof Sprite);
            if (sprite) {
                slot.removeChild(sprite);
            }
        });

        this.characterSlotsDispo.forEach((slot, index) => {
            const characterData = characters_DB.getAllCharacters()[index];
            if (characterData) {
                const spriteInfo = characters_DB.getCharacterSprite(characterData);
                const sprite = new Sprite(ImageManager.loadCharacter(characterData.sprite));
                sprite.setFrame(spriteInfo.spriteX + spriteInfo.frameX, spriteInfo.spriteY + spriteInfo.frameY, spriteInfo.frameWidth, spriteInfo.frameHeight);
                const scale = 48 / spriteInfo.frameHeight;
                sprite.scale.set(scale, scale);
                sprite.x = 10;
                sprite.y = 0;
                slot.addChild(sprite);

                // Deshabilitar o resaltar la casilla según el estado del interruptor
                if (!$gameSwitches.value(characterData.switchId)) {
                    slot.opacity = 128; // Reducir la opacidad si el interruptor no está activado
                } else {
                    slot.opacity = 255; // Restaurar la opacidad si el interruptor está activado
                }
            }
        });
    };

    // --------------- Actualizar la descripción del contrato ---------------
    Scene_TeamMenu_HPK.prototype.updateDescripcionPersonaje = function () {
        const selectedCharacterId = $gameVariables.value(299);
        const characterData = characters_DB.getCharacterByActorId(selectedCharacterId);

        this._descripcionText.bitmap.clear();
        this._descripcionText.bitmap.fontSize = 14;

        const wrapText = (text, maxWidth) => {
            const lines = [];
            const words = text.split(" ");
            let line = "";

            words.forEach(word => {
                let testLine = line + word + " ";
                let testWidth = this._descripcionText.bitmap.measureTextWidth(testLine);

                if (testWidth > maxWidth && line !== "") {
                    lines.push(line.trim());
                    line = word + " ";
                } else {
                    line = testLine;
                }
            });

            lines.push(line.trim());
            return lines;
        };

        if (characterData) {
            let description = "";

            // Verificar si el interruptor del personaje está activado
            if ($gameSwitches.value(characterData.switchId)) {
                // Si el interruptor está activado, mostrar equipmentDescription
                description = characterData.equipmentDescription || "No hay descripción de equipo disponible.";
            } else {
                // Si el interruptor no está activado, mostrar characterLocation
                description = characterData.characterLocation || "No hay información de ubicación disponible.";
            }

            // Ajustar el texto para que se ajuste al ancho de la ventana
            const wrappedLines = wrapText(description, 580);

            // Dibujar el texto en la ventana de descripción
            wrappedLines.forEach((line, index) => {
                this._descripcionText.bitmap.drawText(line, 0, index * 20, 580, 20, 'left');
            });
        } else {
            // Mostrar mensaje predeterminado si no hay personaje seleccionado
            const defaultMessage = [
                "Para moverse entre casillas presione ↑ ↓",
                "Para elegir un personaje presione Z o ENTER",
                "Para salir de una sección presione X o ESCAPE",
                "Para quitar a un personaje del equipo presione SHIFT"
            ];

            defaultMessage.forEach((line, index) => {
                this._descripcionText.bitmap.drawText(line, 0, index * 20, 580, 20, 'left');
            });
        }
    };

    // --------------- Actualizar la variable 299 con el ID del personaje seleccionado ---------------
    Scene_TeamMenu_HPK.prototype.updateCursorDescriptionVariable = function () {
        if (this.selectedSection === 'contratosActivo') {
            // Obtener el personaje seleccionado en "Personajes Activos"
            const selectedCharacter = this.getCharacterForSlot(this.cursor_SlotIndexAct);
            if (selectedCharacter) {
                $gameVariables.setValue(299, selectedCharacter.actorId()); // Asignar el ID a la variable 299
            } else {
                $gameVariables.setValue(299, 0); // Si no hay personaje, asignar 0
            }
        } else if (this.selectedSection === 'contratosDisponible') {
            // Obtener el personaje seleccionado en "Personajes Disponibles"
            const selectedCharacterData = this.getCharacterDataForSlotDispo(this.cursor_SlotIndexDispo);
            if (selectedCharacterData) {
                $gameVariables.setValue(299, selectedCharacterData.actorId); // Asignar el ID a la variable 299
            } else {
                $gameVariables.setValue(299, 0); // Si no hay personaje, asignar 0
            }
        }
    };

    // --------------- Funcion del menú ---------------




    // Cambiar a la escena de TeamMenu cuando se seleccione la opción
    Scene_Menu.prototype.commandTeamMenu = function () {
        SceneManager.push(Scene_TeamMenu_HPK);
    };

})();