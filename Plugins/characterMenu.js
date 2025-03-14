(() => {
    // Verificar que el plugin de la base de datos esté cargado
    if (!window.characters_DB) {
        throw new Error("El plugin 'character_DB' debe cargarse antes que 'CodexMenu'.");
    }

    // Usar las funciones del plugin de la base de datos
    const characters_DB = window.characters_DB;

    // Alias seguro para createCommandWindow
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function () {
        _Scene_Menu_createCommandWindow.call(this); // Llama a la función original
        this.addCodexMenuCommand(); // Agrega la opción de "CodexMenu"
    };

    // Función para añadir el comando "CodexMenu"
    Scene_Menu.prototype.addCodexMenuCommand = function () {
        this._commandWindow.setHandler('CodexMenu', this.commandCodexMenu.bind(this));
    };

    // Extender addOriginalCommands en lugar de sobrescribirlo
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function () {
        _Window_MenuCommand_addOriginalCommands.call(this); // Llama a la función original
        this.addCommand('Codex', 'CodexMenu'); // Agrega el comando "CodexMenu"
    };

    // Crear la escena del menú de CodexMenu
    function Scene_CodexMenu() {
        this.initialize.apply(this, arguments);
    }

    Scene_CodexMenu.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CodexMenu.prototype.constructor = Scene_CodexMenu;

    // Cambiar a la escena de CodexMenu cuando se seleccione la opción
    Scene_Menu.prototype.commandCodexMenu = function () {
        SceneManager.push(Scene_CodexMenu);
    };

    Scene_CodexMenu.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
        this.selectedSection = 'contratosDisponible';
        this.cursor_SlotIndexDispo = 0;
        this.startIndexDispo = 0;
        this.visibleSlotsDispo = 7;
        this._inputCooldown = 0; // Flag para evitar múltiples detecciones
    };

    Scene_CodexMenu.prototype.createSections = function () {
        // Contratos Disponibles
        this._contratosDisponible = this.createContratosDisponibleSection();
        this.addChild(this._contratosDisponible);

        // Descripción del Contrato
        this._descripcionContrato = this.createDescripcionContratoSection();
        this.addChild(this._descripcionContrato);
    };

    // --------------- Crear sección de Contratos disponibles ---------------
    Scene_CodexMenu.prototype.createContratosDisponibleSection = function () {
        const section = new Sprite();
        section.bitmap = new Bitmap(400, 720); // Nuevo tamaño
        section.x = 0; // Posición X
        section.y = 0; // Posición Y
        section.bitmap.fillAll('rgba(0, 0, 0, 0.5)');
        section.bitmap.strokeRect(0, 0, 400, 720, 'white'); // Borde interior
        section.opacity = 255;

        // Título de la sección
        const titleDisponibles = new Sprite(new Bitmap(350, 40)); // Ancho del título
        titleDisponibles.bitmap.fillAll('rgba(0, 0, 0, 0.7)');
        titleDisponibles.bitmap.drawText("Contratos Disponibles", 0, 0, 350, 40, 'center');
        titleDisponibles.x = (400 - 350) / 2; // Centrar el título en el ancho de la sección
        titleDisponibles.y = 20; // Posición Y del título
        titleDisponibles.protected = true;
        section.addChild(titleDisponibles);

        // Casillas de personajes
        this.createCharacterSlots_ConDispo(section);

        return section;
    };

    Scene_CodexMenu.prototype.refreshCharacterSlotsDispo = function () {
        const start = this.startIndexDispo;
        const end = start + this.visibleSlotsDispo;

        // Ocultar todas las casillas primero
        this.characterSlotsDispo.forEach((slot, index) => {
            slot.visible = (index >= start && index < end);
        });

        // Posicionar las casillas visibles
        this.characterSlotsDispo.forEach((slot, index) => {
            if (slot.visible) {
                slot.y = 85 + ((index - start) * 50); // Ajustar la posición Y
            }
        });
    };

    // --------------- Crear sección de descripcion de contrato ---------------
    Scene_CodexMenu.prototype.createDescripcionContratoSection = function () {
        const section = new Sprite();
        section.bitmap = new Bitmap(880, 720); // Tamaño de la sección
        section.x = 400; // Posición X de la sección
        section.y = 0; // Posición Y de la sección
        section.bitmap.fillAll('rgba(0, 0, 0, 0.5)');
        section.bitmap.strokeRect(0, 0, 880, 720, 'white'); // Borde interior

        // Título de la sección
        const title = new Sprite(new Bitmap(500, 40)); // Ancho del título
        title.bitmap.fillAll('rgba(0, 0, 0, 0.7)');
        title.bitmap.drawText("Descripción del personaje", 0, 0, 500, 40, 'center');
        title.x = (880 - 500) / 2; // Centrar el título en el ancho de la sección
        title.y = 20; // Posición Y del título
        section.addChild(title);

        // Texto de la descripción
        this._descripcionText = new Sprite(new Bitmap(700, 200)); // Nuevo tamaño de la descripción
        this._descripcionText.x = (880 - 700) / 2; // Centrar la descripción en el ancho de la sección
        this._descripcionText.y = 475; // Nueva posición Y
        section.addChild(this._descripcionText);

        return section;
    };
    // =============== Sistema de navegación ===============

    // Para las casillas en Contratos Disponibles
    Scene_CodexMenu.prototype.cursor_CharacterSlotDispo = function (index) {
        this.characterSlotsDispo.forEach((slot, i) => {
            slot.isCursor = (i === index);
        });
        this.cursor_SlotIndexDispo = index; // Almacenar el índice del slot seleccionado
    };

    // Navegación para Contratos Disponibles
    Scene_CodexMenu.prototype.navigateConDispo = function (direction) {
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

    // Crear las casillas de personajes para Contratos Disponibles
    Scene_CodexMenu.prototype.createCharacterSlots_ConDispo = function (parent) {
        this.characterSlotsDispo = [];

        // Obtener todos los personajes de la base de datos
        const allCharacters = characters_DB.getAllCharacters();

        // Crear casillas para los personajes
        allCharacters.forEach((characterData, index) => {
            const characterSlot = this.createCharacterSlot_ConDispo(characterData, 25, 85 + (index * 50));
            parent.addChild(characterSlot);
            this.characterSlotsDispo.push(characterSlot);

            // Deshabilitar o resaltar la casilla según el estado del interruptor
            if (!$gameSwitches.value(characterData.switchId)) {
                characterSlot.opacity = 128; // Reducir la opacidad si el interruptor no está activado
            }
        });

        // Resaltar la primera casilla de "Contratos Disponibles" por defecto
        if (this.characterSlotsDispo.length > 0) {
            this.cursor_CharacterSlotDispo(0);
            this.refreshCharacterSlotsDispo(); // Ajustar la visualización inicial
        }
    };

    // Crear una casilla de personaje para Contratos Disponibles
    Scene_CodexMenu.prototype.createCharacterSlot_ConDispo = function (characterData, x, y) {
        const slot = new Sprite();
        slot.bitmap = new Bitmap(345, 48);
        slot.bitmap.fillAll('rgba(15, 11, 11, 0.5)');
        slot.x = x;
        slot.y = y;

        if (characterData) {
            // Obtener la información del sprite
            const spriteInfo = characters_DB.getCharacterSprite(characterData);

            // Crear el sprite del personaje
            const sprite = new Sprite(ImageManager.loadCharacter(characterData.sprite));
            sprite.setFrame(spriteInfo.spriteX + spriteInfo.frameX, spriteInfo.spriteY + spriteInfo.frameY, spriteInfo.frameWidth, spriteInfo.frameHeight);

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

    // =============== Sistema de resaltado en casillas ===============

    // Función para resaltar la casilla donde yace el cursor con un borde interior
    Scene_CodexMenu.prototype.Cursor_highlightSlot = function () {
        this.characterSlotsDispo.forEach((slot, i) => {
            if (slot.isCursor && slot.visible) {
                slot.bitmap.clear();
                slot.bitmap.fillAll('rgba(0, 0, 0, 0.5)');
                slot.bitmap.strokeRect(0, 0, 345, 48, 'gold'); // Borde dorado
            } else if (slot.visible) {
                slot.bitmap.clear();
                slot.bitmap.fillAll('rgba(0, 0, 0, 0.5)');
                slot.bitmap.strokeRect(0, 0, 345, 48, 'white'); // Borde blanco
            }
        });
    };

    Scene_CodexMenu.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createSections();

        // Resaltar la primera casilla de la sección activa
        this.highlightFirstSlot();
    };

    Scene_CodexMenu.prototype.highlightFirstSlot = function () {
        if (this.characterSlotsDispo.length > 0) {
            this.characterSlotsDispo[0].isCursor = true;
            this.Cursor_highlightSlot(); // Aplicar el resaltado
        }
    };

    // =============== Sistema de actualización ===============

    Scene_CodexMenu.prototype.getCharacterDataForSlotDispo = function (index) {
        // Obtener todos los personajes de la base de datos
        const allCharacters = characters_DB.getAllCharacters();

        // Devolver el personaje en el índice especificado
        return allCharacters[index] || null;
    };

    // Actualiza la función 'update' para llamar a la función de resaltado
    Scene_CodexMenu.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);

        // Actualizar la variable 299 con el ID del personaje seleccionado
        this.updateCursorDescriptionVariable();

        // Actualizar la descripción del contrato
        this.updateDescripcionContrato();

        // Reducir el cooldown del input si es mayor que 0
        if (this._inputCooldown > 0) {
            this._inputCooldown--;
        }

        // Navegación por la lista de personajes (teclas arriba/abajo)
        if (Input.isTriggered('down')) {
            this.navigateConDispo(1);
            AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
        } else if (Input.isTriggered('up')) {
            this.navigateConDispo(-1);
            AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
        }

        // Cerrar menú
        if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
            SceneManager.pop();
            AudioManager.playSe({ name: "Crow", volume: 90, pitch: 100, pan: 0 });
        }

        // Resaltar la casilla seleccionada
        this.Cursor_highlightSlot();
    };

    Scene_CodexMenu.prototype.updateCursorDescriptionVariable = function () {
        // Obtener el personaje seleccionado en "Contratos Disponibles"
        const selectedCharacterData = this.getCharacterDataForSlotDispo(this.cursor_SlotIndexDispo);
        if (selectedCharacterData) {
            $gameVariables.setValue(299, selectedCharacterData.actorId); // Asignar el ID a la variable 299
        } else {
            $gameVariables.setValue(299, 0); // Si no hay personaje, asignar 0
        }
    };

    // --------------- Actualizar la descripción del contrato ---------------
    Scene_CodexMenu.prototype.updateDescripcionContrato = function () {
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
            const wrappedLines = wrapText(description, 860);

            // Dibujar el texto en la ventana de descripción
            wrappedLines.forEach((line, index) => {
                this._descripcionText.bitmap.drawText(line, 0, index * 20, 860, 20, 'left');
            });
        } else {
            // Mostrar mensaje predeterminado si no hay personaje seleccionado
            const defaultMessage = [
                "Para moverse entre casillas presione ↑ ↓",
                "Para salir de Codex presione X o ESCAPE"
            ];

            defaultMessage.forEach((line, index) => {
                this._descripcionText.bitmap.drawText(line, 0, index * 20, 860, 20, 'left');
            });
        }
    };

    // --------------- Funcion del menú ---------------

    // Cambiar a la escena de CodexMenu cuando se seleccione la opción
    Scene_Menu.prototype.commandCodexMenu = function () {
        SceneManager.push(Scene_CodexMenu);
    };

})();