//=============================================================================
// WindowData.js
//=============================================================================

const Window_DB = {
    // Tamaño total de la imagen
    imageWidth: 192,
    imageHeight: 192,

    // Tamaño de cada sección (96x96)
    sectionSize: 96,

    // Coordenadas de las secciones
    sections: {
        // Primera sección (fondo general)
        background: { x: 0, y: 0, width: 96, height: 96 },

        // Segunda sección (borde y esquinas)
        border: { x: 96, y: 0, width: 96, height: 96 },

        // Tercera sección (fondo de mosaicos)
        tiles: { x: 0, y: 96, width: 96, height: 96 },

        // Cuarta sección (iconos y otros elementos)
        icons: { x: 96, y: 96, width: 96, height: 96 }
    },

    // Detalles de la segunda sección (borde y esquinas)
    borderDetails: {
        // Bordes
        borders: {
            left: { x: 96, y: 24, width: 24, height: 48 },   // Borde izquierdo
            right: { x: 168, y: 24, width: 24, height: 48 }, // Borde derecho
            top: { x: 120, y: 0, width: 48, height: 24 },    // Borde superior
            bottom: { x: 120, y: 72, width: 48, height: 24 }  // Borde inferior
        },

        // Iconos esquineros
        cornerIcons: [
            { x: 96, y: 0, width: 24, height: 24 },   // Esquina superior izquierda
            { x: 168, y: 0, width: 24, height: 24 },  // Esquina superior derecha
            { x: 96, y: 72, width: 24, height: 24 },  // Esquina inferior izquierda
            { x: 168, y: 72, width: 24, height: 24 }  // Esquina inferior derecha
        ],

        // Icono central (flechas de desplazamiento)
        scrollIcon: {
            x: 120, y: 24, width: 48, height: 48, // Área total del icono
            parts: [
                { x: 120, y: 24, width: 24, height: 24 }, // Parte superior izquierda
                { x: 144, y: 24, width: 24, height: 24 }, // Parte superior derecha
                { x: 120, y: 48, width: 24, height: 24 }, // Parte inferior izquierda
                { x: 144, y: 48, width: 24, height: 24 }  // Parte inferior derecha
            ]
        }
    },

    // Función para dibujar el fondo (sección 1 y sección 3)
    drawBackground: function (bitmap, windowImage) {
        const backgroundSection = this.getSection('background');
        const tilesSection = this.getSection('tiles');

        // Establecer la opacidad al 50%
        bitmap.context.globalAlpha = 1.0;

        // Dibujar el fondo general (sección 1)
        bitmap.blt(windowImage, backgroundSection.x, backgroundSection.y, backgroundSection.width, backgroundSection.height, 0, 0, bitmap.width, bitmap.height);

        // Dibujar el fondo de mosaicos (sección 3)
        for (let y = 0; y < bitmap.height; y += tilesSection.height) {
            for (let x = 0; x < bitmap.width; x += tilesSection.width) {
                bitmap.blt(windowImage, tilesSection.x, tilesSection.y, tilesSection.width, tilesSection.height, x, y, tilesSection.width, tilesSection.height);
            }
        }

        // Restaurar la opacidad al valor por defecto (100%)
        bitmap.context.globalAlpha = 1.0;
    },

    // Función para dibujar bordes sin superponer los iconos esquineros
    drawBorders: function (bitmap, windowImage) {
        const borderDetails = this.getBorderDetails();

        // Bordes izquierdo y derecho (no estirar el ancho, solo el alto)
        const leftBorder = borderDetails.borders.left;
        const rightBorder = borderDetails.borders.right;

        // Bordes superior e inferior (no estirar el alto, solo el ancho)
        const topBorder = borderDetails.borders.top;
        const bottomBorder = borderDetails.borders.bottom;

        // Espacio reservado para los iconos de las esquinas
        const cornerSpace = 24;

        // Dibujar borde izquierdo (comienza 24 píxeles después y termina 24 píxeles antes)
        for (let y = cornerSpace; y < bitmap.height - cornerSpace; y += leftBorder.height) {
            const drawHeight = Math.min(leftBorder.height, bitmap.height - cornerSpace - y);
            bitmap.blt(windowImage, leftBorder.x, leftBorder.y, leftBorder.width, drawHeight, 0, y, leftBorder.width, drawHeight);
        }

        // Dibujar borde derecho (comienza 24 píxeles después y termina 24 píxeles antes)
        for (let y = cornerSpace; y < bitmap.height - cornerSpace; y += rightBorder.height) {
            const drawHeight = Math.min(rightBorder.height, bitmap.height - cornerSpace - y);
            bitmap.blt(windowImage, rightBorder.x, rightBorder.y, rightBorder.width, drawHeight, bitmap.width - rightBorder.width, y, rightBorder.width, drawHeight);
        }

        // Dibujar borde superior (comienza 24 píxeles después y termina 24 píxeles antes)
        for (let x = cornerSpace; x < bitmap.width - cornerSpace; x += topBorder.width) {
            const drawWidth = Math.min(topBorder.width, bitmap.width - cornerSpace - x);
            bitmap.blt(windowImage, topBorder.x, topBorder.y, drawWidth, topBorder.height, x, 0, drawWidth, topBorder.height);
        }

        // Dibujar borde inferior (comienza 24 píxeles después y termina 24 píxeles antes)
        for (let x = cornerSpace; x < bitmap.width - cornerSpace; x += bottomBorder.width) {
            const drawWidth = Math.min(bottomBorder.width, bitmap.width - cornerSpace - x);
            bitmap.blt(windowImage, bottomBorder.x, bottomBorder.y, drawWidth, bottomBorder.height, x, bitmap.height - bottomBorder.height, drawWidth, bottomBorder.height);
        }
    },

    // Función para dibujar iconos esquineros
    drawCornerIcons: function (bitmap, windowImage) {
        const cornerIcons = this.getBorderDetails().cornerIcons;

        // Dibujar iconos en las esquinas
        bitmap.blt(windowImage, cornerIcons[0].x, cornerIcons[0].y, cornerIcons[0].width, cornerIcons[0].height, 0, 0, cornerIcons[0].width, cornerIcons[0].height); // Superior izquierda
        bitmap.blt(windowImage, cornerIcons[1].x, cornerIcons[1].y, cornerIcons[1].width, cornerIcons[1].height, bitmap.width - cornerIcons[1].width, 0, cornerIcons[1].width, cornerIcons[1].height); // Superior derecha
        bitmap.blt(windowImage, cornerIcons[2].x, cornerIcons[2].y, cornerIcons[2].width, cornerIcons[2].height, 0, bitmap.height - cornerIcons[2].height, cornerIcons[2].width, cornerIcons[2].height); // Inferior izquierda
        bitmap.blt(windowImage, cornerIcons[3].x, cornerIcons[3].y, cornerIcons[3].width, cornerIcons[3].height, bitmap.width - cornerIcons[3].width, bitmap.height - cornerIcons[3].height, cornerIcons[3].width, cornerIcons[3].height); // Inferior derecha
    },

    // Función para obtener los datos de una sección específica
    getSection: function (sectionName) {
        return this.sections[sectionName];
    },

    // Función para obtener los detalles del borde
    getBorderDetails: function () {
        return this.borderDetails;
    },

    // Función para obtener los detalles de los iconos
    getIconDetails: function () {
        return this.iconDetails;
    }
};

// Exportar la API para su uso en otros scripts
window.Window_DB = Window_DB;