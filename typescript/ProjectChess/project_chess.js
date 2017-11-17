var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var State;
(function (State) {
    State[State["WHITES_TURN"] = 0] = "WHITES_TURN";
    State[State["BLACKS_TURN"] = 1] = "BLACKS_TURN";
    State[State["FINISH"] = 2] = "FINISH";
})(State || (State = {}));
var StaticColors = /** @class */ (function () {
    function StaticColors() {
    }
    StaticColors.BASIC_BOARD_WHITE = "#f0d9b5";
    StaticColors.BASIC_BOARD_BLACK = "#b58863";
    StaticColors.SQUARE_SELECTION_BLUE = "#7294da";
    StaticColors.SQUARE_SELECTION_RED = "#e60000";
    return StaticColors;
}());
var Algorithms = /** @class */ (function () {
    function Algorithms() {
    }
    Algorithms.shuffle = function (array) {
        var i = 0, j = 0, temp = null;
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
    return Algorithms;
}());
var CallbackPool = /** @class */ (function () {
    function CallbackPool() {
        var callbacks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            callbacks[_i] = arguments[_i];
        }
        this.callbacks = [];
        this.callbacks = callbacks;
    }
    CallbackPool.prototype.addCallback = function (callback) {
        this.callbacks.push(callback);
        return this;
    };
    CallbackPool.prototype.fire = function () {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    };
    CallbackPool.prototype.reset = function () {
        this.callbacks = [];
    };
    return CallbackPool;
}());
var IDSequence = /** @class */ (function () {
    function IDSequence() {
    }
    IDSequence.nextVal = function () {
        IDSequence.count = IDSequence.count + 1;
        return IDSequence.count;
    };
    IDSequence.count = 0;
    return IDSequence;
}());
var HTMLObject = /** @class */ (function () {
    function HTMLObject() {
        this.id = IDSequence.nextVal() + "";
    }
    HTMLObject.prototype.setTopPos = function (input) {
        this.topPos = input;
    };
    HTMLObject.prototype.setLeftPos = function (input) {
        this.leftPos = input;
    };
    HTMLObject.prototype.setHeight = function (input) {
        this.height = input;
    };
    HTMLObject.prototype.setWidth = function (input) {
        this.width = input;
    };
    HTMLObject.prototype.getTopPos = function () {
        return this.topPos;
    };
    HTMLObject.prototype.getLeftPos = function () {
        return this.leftPos;
    };
    HTMLObject.prototype.getId = function () {
        return this.id;
    };
    HTMLObject.prototype.setId = function (id) {
        this.id = id;
    };
    HTMLObject.prototype.getHeight = function () {
        return this.height;
    };
    HTMLObject.prototype.getWidth = function () {
        return this.width;
    };
    return HTMLObject;
}());
var HTMLBuilder = /** @class */ (function () {
    function HTMLBuilder() {
        this.styles = {};
        this.classes = new Array();
        this.innerDivs = new Array();
        this.base = "<div {info-template}>{inner}</div>";
    }
    HTMLBuilder.prototype.newDiv = function () {
        return this;
    };
    HTMLBuilder.prototype.setId = function (id) {
        this.id = id;
        return this;
    };
    HTMLBuilder.prototype.addStyle = function (type, value) {
        this.styles[type] = value;
        return this;
    };
    HTMLBuilder.prototype.addClass = function (classname) {
        this.classes.push(classname);
        return this;
    };
    HTMLBuilder.prototype.addInnerDiv = function (innerDiv) {
        this.innerDivs.push(innerDiv);
        return this;
    };
    HTMLBuilder.prototype.toString = function () {
        var result;
        var style;
        var idDef = "";
        var classDef;
        var innerDivDef = "";
        if (this.id != undefined) {
            idDef = "id=\"" + this.id + "\"";
        }
        style = "style=\"";
        for (var each in this.styles) {
            style = style + each + ": " + this.styles[each] + "; ";
        }
        style = style + "\"";
        classDef = "class=\"";
        for (var eachClass in this.classes) {
            classDef = classDef + this.classes[eachClass] + " ";
        }
        classDef = classDef + "\"";
        if (this.innerDivs.length > 0) {
            for (var eachDiv in this.innerDivs) {
                innerDivDef += this.innerDivs[eachDiv];
            }
        }
        result = this.base.replace("{info-template}", (idDef + " " + classDef + " " + style));
        result = result.replace("{inner}", innerDivDef);
        return result;
    };
    return HTMLBuilder;
}());
var Color;
(function (Color) {
    Color[Color["WHITE"] = 0] = "WHITE";
    Color[Color["BLACK"] = 1] = "BLACK";
})(Color || (Color = {}));
var SquareType;
(function (SquareType) {
    SquareType[SquareType["NORMAL"] = 0] = "NORMAL";
    SquareType[SquareType["NON_EXISTENT"] = 1] = "NON_EXISTENT";
})(SquareType || (SquareType = {}));
var PieceType;
(function (PieceType) {
    PieceType[PieceType["PAWN"] = 1] = "PAWN";
    PieceType[PieceType["KNIGHT"] = 2] = "KNIGHT";
    PieceType[PieceType["BISHOP"] = 3] = "BISHOP";
    PieceType[PieceType["ROOK"] = 4] = "ROOK";
    PieceType[PieceType["QUEEN"] = 5] = "QUEEN";
    PieceType[PieceType["KING"] = 6] = "KING";
    PieceType[PieceType["WAR_MACHINE"] = 7] = "WAR_MACHINE";
    PieceType[PieceType["MINISTER"] = 8] = "MINISTER";
    PieceType[PieceType["GENERAL"] = 9] = "GENERAL";
    PieceType[PieceType["GIRAFFE_RIDER"] = 10] = "GIRAFFE_RIDER";
    PieceType[PieceType["PICKET"] = 11] = "PICKET";
    PieceType[PieceType["ELEPHANT_RIDER"] = 12] = "ELEPHANT_RIDER";
    PieceType[PieceType["CAMEL_RIDER"] = 13] = "CAMEL_RIDER";
    PieceType[PieceType["HERO"] = 14] = "HERO";
    PieceType[PieceType["CANNON"] = 15] = "CANNON";
})(PieceType || (PieceType = {}));
var PieceLocation = /** @class */ (function () {
    function PieceLocation(x, y, type, color) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
    }
    PieceLocation.prototype.getX = function () {
        return this.x;
    };
    PieceLocation.prototype.getY = function () {
        return this.y;
    };
    PieceLocation.prototype.getType = function () {
        return this.type;
    };
    PieceLocation.prototype.getColor = function () {
        return this.color;
    };
    return PieceLocation;
}());
var PieceImageDatabase = /** @class */ (function () {
    function PieceImageDatabase() {
    }
    PieceImageDatabase.getImageURL = function (type, color) {
        if (color == Color.WHITE) {
            return PieceImageDatabase.getWhiteImage(type);
        }
        else if (color == Color.BLACK) {
            return PieceImageDatabase.getBlackImage(type);
        }
    };
    PieceImageDatabase.getWhiteImage = function (type) {
        var result = "";
        this.whiteImages.forEach(function (value, key, map) {
            if (key == type) {
                result = value;
            }
        });
        return result;
    };
    PieceImageDatabase.getBlackImage = function (type) {
        var result = "";
        this.blackImages.forEach(function (value, key, map) {
            if (key == type) {
                result = value;
            }
        });
        return result;
    };
    PieceImageDatabase.whiteMap = function () {
        var whiteImages = new Map();
        whiteImages.set(PieceType.PAWN, 'imgs//pieces//pawn_w.png');
        whiteImages.set(PieceType.KNIGHT, 'imgs//pieces//Knight_W.png');
        whiteImages.set(PieceType.BISHOP, 'imgs//pieces//Bishop_W.png');
        whiteImages.set(PieceType.ROOK, 'imgs//pieces//Rook_W.png');
        whiteImages.set(PieceType.QUEEN, 'imgs//pieces//Queen_W.png');
        whiteImages.set(PieceType.KING, 'imgs//pieces//King_W.png');
        whiteImages.set(PieceType.MINISTER, 'imgs//pieces//Minister_W.png');
        whiteImages.set(PieceType.GENERAL, 'imgs//pieces//General_W.png');
        whiteImages.set(PieceType.GIRAFFE_RIDER, 'imgs//pieces//Giraffe_W.png');
        whiteImages.set(PieceType.CAMEL_RIDER, 'imgs//pieces//Camel_W.png');
        whiteImages.set(PieceType.ELEPHANT_RIDER, 'imgs//pieces//Elephant_W.png');
        whiteImages.set(PieceType.PICKET, 'imgs//pieces//Picket_W.png');
        whiteImages.set(PieceType.WAR_MACHINE, 'imgs//pieces//WarMachine_W.png');
        whiteImages.set(PieceType.CANNON, 'imgs//pieces//WarMachine_W.png');
        return whiteImages;
    };
    PieceImageDatabase.blackMap = function () {
        var blackImages = new Map();
        blackImages.set(PieceType.PAWN, 'imgs//pieces//pawn_b.png');
        blackImages.set(PieceType.KNIGHT, 'imgs//pieces//Knight_B.png');
        blackImages.set(PieceType.BISHOP, 'imgs//pieces//Bishop_B.png');
        blackImages.set(PieceType.ROOK, 'imgs//pieces//Rook_B.png');
        blackImages.set(PieceType.QUEEN, 'imgs//pieces//Queen_B.png');
        blackImages.set(PieceType.KING, 'imgs//pieces//King_B.png');
        blackImages.set(PieceType.MINISTER, 'imgs//pieces//Minister_B.png');
        blackImages.set(PieceType.GENERAL, 'imgs//pieces//General_B.png');
        blackImages.set(PieceType.GIRAFFE_RIDER, 'imgs//pieces//Giraffe_B.png');
        blackImages.set(PieceType.CAMEL_RIDER, 'imgs//pieces//Camel_B.png');
        blackImages.set(PieceType.ELEPHANT_RIDER, 'imgs//pieces//Elephant_B.png');
        blackImages.set(PieceType.PICKET, 'imgs//pieces//Picket_B.png');
        blackImages.set(PieceType.WAR_MACHINE, 'imgs//pieces//WarMachine_B.png');
        blackImages.set(PieceType.CANNON, 'imgs//pieces//WarMachine_B.png');
        return blackImages;
    };
    PieceImageDatabase.whiteImages = PieceImageDatabase.whiteMap();
    PieceImageDatabase.blackImages = PieceImageDatabase.blackMap();
    return PieceImageDatabase;
}());
var Piece = /** @class */ (function (_super) {
    __extends(Piece, _super);
    function Piece(left, top, width, height, z, color, type) {
        var _this = _super.call(this) || this;
        _this.setTopPos(top);
        _this.setLeftPos(left);
        _this.setWidth(width);
        _this.setHeight(height);
        _this.setZ(z);
        _this.setColor(color);
        _this.setType(type);
        return _this;
    }
    Piece.prototype.setType = function (type) {
        this.type = type;
    };
    Piece.prototype.getType = function () {
        return this.type;
    };
    Piece.prototype.setZ = function (z) {
        this.z = z;
    };
    Piece.prototype.getZ = function () {
        return this.z;
    };
    Piece.prototype.setX = function (x) {
        this.x = x;
    };
    Piece.prototype.getX = function () {
        return this.x;
    };
    Piece.prototype.setY = function (y) {
        this.y = y;
    };
    Piece.prototype.getY = function () {
        return this.y;
    };
    Piece.prototype.getWhiteImg = function () {
        return PieceImageDatabase.getImageURL(this.getType(), Color.WHITE);
    };
    Piece.prototype.getBlackImg = function () {
        return PieceImageDatabase.getImageURL(this.getType(), Color.BLACK);
    };
    Piece.getSizeRatio = function () {
        return 1.5;
    };
    Piece.prototype.setColor = function (color) {
        this.color = color;
    };
    Piece.prototype.getColor = function () {
        return this.color;
    };
    Piece.prototype.toHTML = function () {
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addClass("piece")
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px")
            .addStyle("z-index", this.getZ() + "")
            .addStyle("pointer-events", "none")
            .setId(this.getId());
        var contentImg;
        if (this.getColor() == Color.WHITE) {
            contentImg = this.getWhiteImg();
        }
        else if (this.getColor() == Color.BLACK) {
            contentImg = this.getBlackImg();
        }
        builder.addStyle("content", "url(" + contentImg + ")");
        return builder.toString();
    };
    Piece.prototype.getPos = function () {
        return new Pos(this.getX(), this.getY());
    };
    return Piece;
}(HTMLObject));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(left, top, width, height) {
        var _this = _super.call(this) || this;
        _this.sqrType = SquareType.NORMAL;
        _this.setTopPos(top);
        _this.setLeftPos(left);
        _this.setWidth(width);
        _this.setHeight(height);
        return _this;
    }
    Square.prototype.setX = function (x) {
        this.x = x;
    };
    Square.prototype.setY = function (y) {
        this.y = y;
    };
    Square.prototype.setHexColor = function (hex) {
        this.hexColor = hex;
    };
    Square.prototype.setType = function (type) {
        this.sqrType = type;
    };
    Square.prototype.getType = function () {
        return this.sqrType;
    };
    Square.prototype.resetHexColor = function () {
        var hexColor;
        switch (this.col) {
            case Color.WHITE:
                hexColor = "#f0d9b5";
                break;
            case Color.BLACK:
                hexColor = "#b58863";
                break;
        }
        this.setHexColor(hexColor);
    };
    Square.prototype.getY = function () {
        return this.y;
    };
    Square.prototype.getX = function () {
        return this.x;
    };
    Square.prototype.setColor = function (newCol) {
        this.col = newCol;
        this.resetHexColor();
    };
    Square.prototype.getColor = function () {
        return this.col;
    };
    Square.prototype.getPos = function () {
        return new Pos(this.getX(), this.getY());
    };
    Square.prototype.toHTML = function () {
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addClass("square")
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px");
        builder.setId(this.getId());
        if (!(this.getType() == SquareType.NON_EXISTENT)) {
            builder.addStyle("border", "1px solid black");
            builder.addStyle("background-color", this.hexColor);
        }
        return builder.toString();
    };
    return Square;
}(HTMLObject));
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row(left, top, width, height, sqrCount) {
        var _this = _super.call(this) || this;
        _this.squares = new Array();
        _this.setTopPos(top);
        _this.setLeftPos(left);
        _this.setWidth(width);
        _this.setHeight(height);
        _this.setNumSquares(sqrCount);
        return _this;
    }
    Row.prototype.initialize = function () {
        for (var i = 0; i < this.getNumSquares(); i++) {
            var newSquare = new Square(this.getSquareLeftPos(i), 0, this.getSquareWidth(), this.getHeight());
            newSquare.setX(i);
            newSquare.setY(this.getY());
            newSquare.setId("square_" + i + "_" + this.getY());
            this.squares.push(newSquare);
        }
    };
    Row.prototype.getSquares = function () {
        return this.squares;
    };
    Row.prototype.setY = function (y) {
        this.y = y;
    };
    Row.prototype.getY = function () {
        return this.y;
    };
    Row.prototype.setNumSquares = function (sqrCount) {
        this.numSquares = sqrCount;
    };
    Row.prototype.getNumSquares = function () {
        return this.numSquares;
    };
    Row.prototype.getSquareWidth = function () {
        return Math.ceil(this.getWidth() / this.numSquares);
    };
    Row.prototype.getSquareLeftPos = function (index) {
        return (index * this.getSquareWidth());
    };
    Row.prototype.setAlternating = function (starting) {
        for (var each in this.squares) {
            this.squares[each].setColor(starting);
            if (starting == Color.WHITE) {
                starting = Color.BLACK;
            }
            else if (starting == Color.BLACK) {
                starting = Color.WHITE;
            }
        }
    };
    Row.prototype.toHTML = function () {
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addClass("row")
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px");
        for (var each in this.squares) {
            builder.addInnerDiv(this.squares[each].toHTML());
        }
        return builder.toString();
    };
    return Row;
}(HTMLObject));
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(numCol, numRows, offsetTop, offsetLeft, squareWidth, squareHeight) {
        var _this = _super.call(this) || this;
        _this.squares = new Array();
        _this.rows = new Array();
        _this.pieces = new Array();
        _this.locations = new Array();
        if (offsetTop == null) {
            offsetTop = 25;
        }
        if (offsetLeft == null) {
            offsetLeft = 25;
        }
        if (squareWidth == null) {
            squareWidth = 50;
        }
        if (squareHeight == null) {
            squareHeight = 50;
        }
        _this.squareHeight = squareHeight;
        _this.squareWidth = squareWidth;
        _this.initialize(numCol, numRows, offsetTop, offsetLeft);
        return _this;
    }
    Board.prototype.initialize = function (numCol, numRows, offsetTop, offsetLeft) {
        this.numRows = numRows;
        this.numColumns = numCol;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
        this.rows = new Array();
        var cornerColor = Color.WHITE;
        for (var i = 0; i < this.numRows; i++) {
            var row = new Row(this.offsetLeft, this.offsetTop + (i * this.squareHeight), this.squareWidth * this.numColumns, this.squareHeight, this.numColumns);
            row.setY(i);
            row.initialize();
            row.setAlternating(cornerColor);
            this.rows.push(row);
            if (cornerColor == Color.WHITE) {
                cornerColor = Color.BLACK;
            }
            else if (cornerColor == Color.BLACK) {
                cornerColor = Color.WHITE;
            }
        }
    };
    Board.prototype.getPieces = function () {
        return this.pieces;
    };
    Board.prototype.getSquares = function () {
        var result = new Array();
        for (var row in this.rows) {
            var each = this.rows[row];
            var meSqrs = each.getSquares();
            for (var square in each.getSquares()) {
                var eachSqr = meSqrs[square];
                result.push(eachSqr);
            }
        }
        return result;
    };
    Board.prototype.addPiece = function (piece, x, y, color) {
        var newPiece;
        /* switch(piece){
             case PieceType.ROOK: newPiece = new Rook(this.calcPosFromLeft(x), this.calcPosFromTop(Rook.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Rook.getSizeRatio()), y, color); break;
             case PieceType.QUEEN: newPiece = new Queen(this.calcPosFromLeft(x), this.calcPosFromTop(Queen.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Queen.getSizeRatio()), y, color); break;
             case PieceType.BISHOP: newPiece = new Bishop(this.calcPosFromLeft(x), this.calcPosFromTop(Bishop.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Bishop.getSizeRatio()), y, color); break;
             case PieceType.PAWN: newPiece = new Pawn(this.calcPosFromLeft(x), this.calcPosFromTop(Pawn.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Pawn.getSizeRatio()), y, color); break;
             case PieceType.KNIGHT: newPiece = new Knight(this.calcPosFromLeft(x), this.calcPosFromTop(Knight.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Knight.getSizeRatio()), y, color); break;
             case PieceType.KING: newPiece = new King(this.calcPosFromLeft(x), this.calcPosFromTop(King.getSizeRatio(), y), this.squareWidth, (this.squareHeight * King.getSizeRatio()), y, color); break;
             case PieceType.GENERAL: newPiece = new General(this.calcPosFromLeft(x), this.calcPosFromTop(Knight.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Knight.getSizeRatio()), y, color); break;
             case PieceType.MINISTER: newPiece = new Minister(this.calcPosFromLeft(x), this.calcPosFromTop(King.getSizeRatio(), y), this.squareWidth, (this.squareHeight * King.getSizeRatio()), y, color); break;
         }*/
        newPiece = new Piece(this.calcPosFromLeft(x), this.calcPosFromTop(Piece.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Piece.getSizeRatio()), y, color, piece);
        newPiece.setX(x);
        newPiece.setY(y);
        this.pieces.push(newPiece);
        this.addLocation(x, y, piece, color);
    };
    Board.prototype.toHTML = function () {
        var result = "";
        for (var row in this.rows) {
            result += this.rows[row].toHTML();
        }
        for (var piece in this.pieces) {
            result += this.pieces[piece].toHTML();
        }
        return result;
    };
    Board.prototype.setStandard = function () {
        this.addPiece(PieceType.ROOK, 0, 0, Color.BLACK);
        this.addPiece(PieceType.KNIGHT, 1, 0, Color.BLACK);
        this.addPiece(PieceType.BISHOP, 2, 0, Color.BLACK);
        this.addPiece(PieceType.QUEEN, 3, 0, Color.BLACK);
        this.addPiece(PieceType.KING, 4, 0, Color.BLACK);
        this.addPiece(PieceType.BISHOP, 5, 0, Color.BLACK);
        this.addPiece(PieceType.KNIGHT, 6, 0, Color.BLACK);
        this.addPiece(PieceType.ROOK, 7, 0, Color.BLACK);
        this.addPiece(PieceType.PAWN, 0, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 1, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 2, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 3, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 4, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 5, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 6, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 7, 1, Color.BLACK);
        this.addPiece(PieceType.ROOK, 0, 7, Color.WHITE);
        this.addPiece(PieceType.KNIGHT, 1, 7, Color.WHITE);
        this.addPiece(PieceType.BISHOP, 2, 7, Color.WHITE);
        this.addPiece(PieceType.QUEEN, 3, 7, Color.WHITE);
        this.addPiece(PieceType.KING, 4, 7, Color.WHITE);
        this.addPiece(PieceType.BISHOP, 5, 7, Color.WHITE);
        this.addPiece(PieceType.KNIGHT, 6, 7, Color.WHITE);
        this.addPiece(PieceType.ROOK, 7, 7, Color.WHITE);
        this.addPiece(PieceType.PAWN, 0, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 1, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 2, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 3, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 4, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 5, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 6, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 7, 6, Color.WHITE);
    };
    Board.prototype.addLocation = function (x, y, type, color) {
        var newLocation = new PieceLocation(x, y, type, color);
        this.locations.push(newLocation);
    };
    Board.prototype.calcPosFromLeft = function (x) {
        return this.offsetLeft + (x * this.squareWidth);
    };
    Board.prototype.calcPosFromTop = function (ratio, y) {
        return (this.offsetTop + (y * this.squareHeight)) + (this.squareHeight * (1 - ratio));
    };
    Board.prototype.getPieceById = function (id) {
        for (var piece in this.pieces) {
            var each = this.pieces[piece];
            if (each.getId() == id) {
                return each;
            }
        }
    };
    Board.prototype.getSquareById = function (id) {
        var locSquares = this.getSquares();
        for (var square in locSquares) {
            var each = locSquares[square];
            if (each.getId() == id) {
                return each;
            }
        }
    };
    Board.fromSerial = function (serial, offsetTop, offsetLeft, squareWidth, squareHeight) {
        var result;
        var locations = new Array();
        var length;
        var height;
        var dataHalves = serial.split("-");
        var rows = dataHalves[0].split("/");
        var configRows = dataHalves[1].split("/");
        height = rows.length;
        for (var y = 0; y < rows.length; y++) {
            var row = rows[y];
            var squares = row.split(",");
            length = squares.length;
            for (var x = 0; x < squares.length; x++) {
                var sqrData = squares[x].substring(1, squares[x].length - 1);
                if (sqrData.length != 0) {
                    var sqrDataSplit = sqrData.split("_");
                    var thisColor;
                    if (sqrDataSplit[1] == "W") {
                        thisColor = Color.WHITE;
                    }
                    else {
                        thisColor = Color.BLACK;
                    }
                    var newLoc = new PieceLocation(x, y, +sqrDataSplit[0], thisColor);
                    locations.push(newLoc);
                }
            }
        }
        result = new Board(length, height, offsetTop, offsetLeft, squareWidth, squareHeight);
        for (var eachLoc in locations) {
            var location = locations[eachLoc];
            result.addPiece(location.getType(), location.getX(), location.getY(), location.getColor());
        }
        for (var y = 0; y < rows.length; y++) {
            var row = configRows[y];
            var squares = row.split(",");
            length = squares.length;
            for (var x = 0; x < squares.length; x++) {
                var eachSqr = result.getSquareAtPos(new Pos(x, y));
                var sqrData = squares[x].substring(1, squares[x].length - 1);
                eachSqr.setType(+sqrData);
            }
        }
        return result;
    };
    Board.prototype.serialize = function () {
        var serialization = "";
        var pieceMap = [];
        for (var r = 0; r < this.numRows; r++) {
            pieceMap[r] = [];
        }
        for (var location in this.locations) {
            var currLoc = this.locations[location];
            var strRep = "[" + currLoc.getType() + "_";
            if (currLoc.getColor() == Color.WHITE) {
                strRep += "W";
            }
            else if (currLoc.getColor() == Color.BLACK) {
                strRep += "B";
            }
            strRep += "]";
            pieceMap[currLoc.getX()][currLoc.getY()] = strRep;
        }
        for (var y = 0; y < this.numRows; y++) {
            for (var x = 0; x < this.numColumns; x++) {
                if (pieceMap[x][y] == undefined) {
                    serialization += "[]";
                }
                else {
                    serialization += pieceMap[x][y];
                }
                serialization += ",";
            }
            serialization = serialization.substring(0, serialization.length - 1);
            serialization += "/";
        }
        serialization = serialization.substring(0, serialization.length - 1);
        serialization += "-";
        for (var y = 0; y < this.numRows; y++) {
            for (var x = 0; x < this.numColumns; x++) {
                serialization += "[" + this.getSquareAtPos(new Pos(x, y)).getType() + "],";
            }
            serialization = serialization.substring(0, serialization.length - 1);
            serialization += "/";
        }
        serialization = serialization.substring(0, serialization.length - 1);
        return serialization;
    };
    Board.prototype.unselectAllSquares = function () {
        var locSquares = this.getSquares();
        for (var square in locSquares) {
            var each = locSquares[square];
            each.resetHexColor();
        }
    };
    Board.prototype.getSquareAtPos = function (pos) {
        var locSquares = this.getSquares();
        for (var square in locSquares) {
            var each = locSquares[square];
            if (each.getPos().equals(pos)) {
                return each;
            }
        }
    };
    Board.prototype.getPieceAtPos = function (pos) {
        for (var piece in this.pieces) {
            var each = this.pieces[piece];
            if (each.getPos().equals(pos)) {
                return each;
            }
        }
        return null;
    };
    Board.prototype.removePieceAtPos = function (pos) {
        var idx2Delete;
        for (var piece in this.pieces) {
            var each = this.pieces[piece];
            if (each.getPos().equals(pos)) {
                idx2Delete = piece;
            }
        }
        this.pieces.splice(idx2Delete, 1);
        for (var locIdx in this.locations) {
            var eachLoc = this.locations[locIdx];
            if (pos.equals(new Pos(eachLoc.getX(), eachLoc.getY()))) {
                idx2Delete = locIdx;
            }
        }
        this.locations.splice(idx2Delete, 1);
    };
    Board.prototype.getPixelHeight = function () {
        return this.numRows * this.squareHeight + this.offsetTop;
    };
    Board.prototype.getPixelWidth = function () {
        return this.numColumns * this.squareWidth + this.offsetLeft;
    };
    return Board;
}(HTMLObject));
var Throbber = /** @class */ (function (_super) {
    __extends(Throbber, _super);
    function Throbber(width, height, z) {
        var _this = _super.call(this) || this;
        _this.contentImg = "http://v3.preloaders.net/preloaders/5/colored/5.png";
        _this.setWidth(width);
        _this.setHeight(height);
        _this.z = z;
        return _this;
    }
    Throbber.prototype.centerInSquare = function (sqrOffsetLeft, sqrOffsetTop, sqrWidth, sqrHeight) {
        this.setLeftPos(sqrOffsetLeft + (sqrWidth / 2 - this.getWidth() / 2));
        this.setTopPos(sqrOffsetTop + (sqrHeight / 2 - this.getHeight() / 2));
    };
    Throbber.prototype.setZ = function (z) {
        this.z = z;
    };
    Throbber.prototype.getZ = function () {
        return this.z;
    };
    Throbber.prototype.toHTML = function () {
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addClass("throbber spin")
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("z-index", this.getZ() + "")
            .addStyle("height", this.getHeight() + "px");
        builder.addStyle("content", "url(" + this.contentImg + ")");
        return builder.toString();
    };
    return Throbber;
}(HTMLObject));
var AlertText = /** @class */ (function (_super) {
    __extends(AlertText, _super);
    function AlertText(width, height, z) {
        var _this = _super.call(this) || this;
        _this.setWidth(width);
        _this.setHeight(height);
        _this.z = z;
        return _this;
    }
    AlertText.prototype.centerInSquare = function (sqrOffsetLeft, sqrOffsetTop, sqrWidth, sqrHeight) {
        this.setLeftPos(sqrOffsetLeft + (sqrWidth / 2 - this.getWidth() / 2));
        this.setTopPos(sqrOffsetTop + (sqrHeight / 2 - this.getHeight() / 2));
    };
    AlertText.prototype.setContent = function (str) {
        this.contentStr = str;
    };
    AlertText.prototype.setZ = function (z) {
        this.z = z;
    };
    AlertText.prototype.getZ = function () {
        return this.z;
    };
    AlertText.prototype.toHTML = function () {
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("z-index", this.getZ() + "")
            .addStyle("height", this.getHeight() + "px")
            .addStyle("font-size", this.getHeight() / 2 + "px")
            .addStyle("pointer-events", "none")
            .addStyle("line-height", this.getHeight() + "px");
        builder.addInnerDiv(this.contentStr);
        return builder.toString();
    };
    return AlertText;
}(HTMLObject));
var Pos = /** @class */ (function () {
    function Pos(x, y) {
        this.X = x;
        this.Y = y;
    }
    Pos.prototype.getX = function () {
        return this.X;
    };
    Pos.prototype.getY = function () {
        return this.Y;
    };
    Pos.prototype.toString = function () {
        return this.getX() + ", " + this.getY();
    };
    Pos.prototype.equals = function (pos) {
        return (this.getX() == pos.getX()) && (this.getY() == pos.getY());
    };
    Pos.prototype.plus = function (addPos) {
        var newX = this.getX() + addPos.getX();
        var newY = this.getY() + addPos.getY();
        return new Pos(newX, newY);
    };
    return Pos;
}());
var MoveType;
(function (MoveType) {
    MoveType[MoveType["NONEXECUTABLE"] = 0] = "NONEXECUTABLE";
    MoveType[MoveType["CAPTURE"] = 1] = "CAPTURE";
    MoveType[MoveType["NONCAPTURE"] = 2] = "NONCAPTURE";
    MoveType[MoveType["FLING"] = 3] = "FLING";
})(MoveType || (MoveType = {}));
var Move = /** @class */ (function () {
    function Move(origin, dest, type) {
        this.dest = dest;
        this.origin = origin;
        this.type = type;
    }
    Move.prototype.getDest = function () {
        return this.dest;
    };
    Move.prototype.getType = function () {
        return this.type;
    };
    Move.prototype.getOrigin = function () {
        return this.origin;
    };
    Move.prototype.equals = function (move) {
        return this.getDest().equals(move.getDest()) && this.getOrigin().equals(move.getOrigin()) && (this.type == move.getType());
    };
    Move.prototype.equalsIgnoreType = function (move) {
        return this.getDest().equals(move.getDest()) && this.getOrigin().equals(move.getOrigin());
    };
    return Move;
}());
var MoveCollection = /** @class */ (function () {
    function MoveCollection(moves) {
        this.moves = new Array();
        if (moves != null && moves != undefined) {
            this.moves = moves;
        }
    }
    MoveCollection.prototype.add = function (move) {
        this.moves.push(move);
    };
    MoveCollection.prototype.getMoves = function () {
        return this.moves;
    };
    MoveCollection.prototype.contains = function (move) {
        var result = false;
        this.moves.forEach(function (e, i, me) {
            if (move.equals(e)) {
                result = true;
            }
        });
        return result;
    };
    MoveCollection.prototype.containsIgnoreType = function (move) {
        var result = false;
        this.moves.forEach(function (e, i, me) {
            if (move.equalsIgnoreType(e)) {
                result = true;
            }
        });
        return result;
    };
    MoveCollection.prototype.addAll = function (movesArg) {
        var _this = this;
        var moveArray = movesArg.getMoves();
        moveArray.forEach(function (e, i, me) {
            _this.moves.push(e);
        });
        return this;
    };
    MoveCollection.prototype.minus = function (movesArg) {
        var result = new Array();
        var moveArray = movesArg.getMoves();
        var length = this.moves.length;
        for (var i = 0; i < moveArray.length; i++) {
            var eachArgMove = moveArray[i];
            for (var j = 0; j < this.moves.length; j++) {
                var eachThisMove = this.moves[j];
                if (eachArgMove.equals(eachThisMove)) {
                    this.moves.splice(j, 1);
                }
            }
        }
        return this;
    };
    MoveCollection.prototype.minusIgnoreType = function (movesArg) {
        var result = new Array();
        var moveArray = movesArg.getMoves();
        var length = this.moves.length;
        for (var i = 0; i < moveArray.length; i++) {
            var eachArgMove = moveArray[i];
            for (var j = 0; j < this.moves.length; j++) {
                var eachThisMove = this.moves[j];
                if (eachArgMove.equalsIgnoreType(eachThisMove)) {
                    this.moves.splice(j, 1);
                }
            }
        }
        return this;
    };
    MoveCollection.prototype.containsDestination = function (pos) {
        for (var moveIdx in this.getMoves()) {
            var eachMove = this.moves[moveIdx];
            if (eachMove.getDest().equals(pos)) {
                return true;
            }
        }
        return false;
    };
    MoveCollection.prototype.shuffle = function () {
        Algorithms.shuffle(this.moves);
    };
    return MoveCollection;
}());
var MoveFactory = /** @class */ (function () {
    function MoveFactory() {
    }
    MoveFactory.getAllUpwards = function (piece) {
        var board = piece.getBoardModel();
        var result = new Array();
        var x = piece.getPos().getX();
        var y = piece.getPos().getY() - 1;
        while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
            y -= 1;
        }
        return new MoveCollection(result);
    };
    MoveFactory.getAllDownwards = function (piece) {
        var board = piece.getBoardModel();
        var result = new Array();
        var x = piece.getPos().getX();
        var y = piece.getPos().getY() + 1;
        while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
            y += 1;
        }
        return new MoveCollection(result);
    };
    MoveFactory.getAllLeft = function (piece) {
        var board = piece.getBoardModel();
        var result = new Array();
        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY();
        while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
            x -= 1;
        }
        return new MoveCollection(result);
    };
    MoveFactory.getAllRight = function (piece) {
        var board = piece.getBoardModel();
        var result = new Array();
        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY();
        while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (piece.getBoardModel().isFree(new Pos(x, y)) == false) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
            x += 1;
        }
        return new MoveCollection(result);
    };
    MoveFactory.getGiraffeMovement = function (piece) {
        var board = piece.getBoardModel();
        var result = new MoveCollection();
        var x = piece.getPos().getX();
        var y = piece.getPos().getY();
        result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x + 1, y - 1)));
        result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x - 1, y - 1)));
        result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x + 1, y + 1)));
        result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x - 1, y + 1)));
        return result;
    };
    MoveFactory.getGiraffeMovementQuarter = function (piece, pos) {
        var board = piece.getBoardModel();
        var result = new MoveCollection();
        var x = pos.getX();
        var y = pos.getY();
        var positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x, y));
        y = y - 1;
        positionsThatMustBeClear.push(new Pos(x, y));
        y = y - 1;
        positionsThatMustBeClear.push(new Pos(x, y));
        y = y - 1;
        if (piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
            while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
                if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                    if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else {
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
                y -= 1;
            }
        }
        x = pos.getX();
        y = pos.getY();
        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x, y));
        x = x + 1;
        positionsThatMustBeClear.push(new Pos(x, y));
        x = x + 1;
        positionsThatMustBeClear.push(new Pos(x, y));
        x = x + 1;
        if (piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
            while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
                if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                    if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else {
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
                x += 1;
            }
        }
        x = pos.getX();
        y = pos.getY();
        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x, y));
        x = x - 1;
        positionsThatMustBeClear.push(new Pos(x, y));
        x = x - 1;
        positionsThatMustBeClear.push(new Pos(x, y));
        x = x - 1;
        if (piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
            while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
                if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                    if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else {
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
                x -= 1;
            }
        }
        x = pos.getX();
        y = pos.getY();
        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x, y));
        y = y + 1;
        positionsThatMustBeClear.push(new Pos(x, y));
        y = y + 1;
        positionsThatMustBeClear.push(new Pos(x, y));
        y = y + 1;
        if (piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
            while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
                if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                    if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else {
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
                y += 1;
            }
        }
        return result;
    };
    MoveFactory.getFling = function (piece, dest) {
        var result = new MoveCollection();
        if (piece.getBoardModel().isValidPosition(dest)) {
            result.add(new Move(piece.getPos(), dest, MoveType.FLING));
        }
        return result;
    };
    MoveFactory.getAllCardinal = function (piece) {
        var result = new MoveCollection();
        result.addAll(MoveFactory.getAllRight(piece));
        result.addAll(MoveFactory.getAllLeft(piece));
        result.addAll(MoveFactory.getAllUpwards(piece));
        result.addAll(MoveFactory.getAllDownwards(piece));
        return result;
    };
    MoveFactory.getAllLeftUpDiagonal = function (piece) {
        var board = piece.getBoardModel();
        var result = new MoveCollection();
        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY() - 1;
        while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
            x -= 1;
            y -= 1;
        }
        return result;
    };
    MoveFactory.getAllRightUpDiagonal = function (piece) {
        var board = piece.getBoardModel();
        var result = new MoveCollection();
        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY() - 1;
        while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
            x += 1;
            y -= 1;
        }
        return result;
    };
    MoveFactory.getAllRightDownDiagonal = function (piece) {
        var board = piece.getBoardModel();
        var result = new MoveCollection();
        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY() + 1;
        while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
            x += 1;
            y += 1;
        }
        return result;
    };
    MoveFactory.getAllLeftDownDiagonal = function (piece) {
        var board = piece.getBoardModel();
        var result = new MoveCollection();
        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY() + 1;
        while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.NONCAPTURE));
            x -= 1;
            y += 1;
        }
        return result;
    };
    MoveFactory.getAllDiagonal = function (piece) {
        var result = new MoveCollection();
        result.addAll(MoveFactory.getAllLeftDownDiagonal(piece));
        result.addAll(MoveFactory.getAllRightDownDiagonal(piece));
        result.addAll(MoveFactory.getAllRightUpDiagonal(piece));
        result.addAll(MoveFactory.getAllLeftUpDiagonal(piece));
        return result;
    };
    MoveFactory.getRelativeToPiece = function (piece, x, y) {
        var result = new MoveCollection();
        var newX = piece.getPos().getX() + x;
        var newY = piece.getPos().getY() + y;
        if (piece.getBoardModel().isValidPosition(new Pos(newX, newY))) {
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
                }
            }
            else {
                result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.NONCAPTURE));
            }
        }
        return result;
    };
    MoveFactory.getRelativeToPieceFling = function (piece, x, y) {
        var result = new MoveCollection();
        var newX = piece.getPos().getX() + x;
        var newY = piece.getPos().getY() + y;
        if (piece.getBoardModel().isValidPosition(new Pos(newX, newY))) {
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
            }
            else {
                result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.FLING));
            }
        }
        return result;
    };
    MoveFactory.getRelativeToPieceNonCapturing = function (piece, x, y) {
        var result = new MoveCollection();
        var newX = piece.getPos().getX() + x;
        var newY = piece.getPos().getY() + y;
        if (piece.getBoardModel().isValidPosition(new Pos(newX, newY))) {
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
            }
            else {
                result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.NONCAPTURE));
            }
        }
        return result;
    };
    MoveFactory.getRelativeToPieceOnlyIfCapturable = function (piece, x, y) {
        var result = new MoveCollection();
        var newX = piece.getPos().getX() + x;
        var newY = piece.getPos().getY() + y;
        if (piece.getBoardModel().isValidPosition(new Pos(newX, newY))) {
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
                }
            }
        }
        return result;
    };
    MoveFactory.getLineForward = function (piece, length, direction) {
        var result = new MoveCollection();
        if (direction > 0) {
            var count = length;
            var newX = piece.getPos().getX();
            var newY = piece.getPos().getY() - 1;
            while (count > 0) {
                if (piece.getBoardModel().isValidPosition(new Pos(newX, newY))) {
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                            result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
                            count--;
                            newY--;
                        }
                    }
                    else {
                        result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.NONCAPTURE));
                        count--;
                        newY--;
                    }
                }
            }
        }
        if (direction < 0) {
            var count = length;
            var newX = piece.getPos().getX();
            var newY = piece.getPos().getY() + 1;
            while (count > 0) {
                if (piece.getBoardModel().isValidPosition(new Pos(newX, newY))) {
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                            result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
                            count--;
                            newY++;
                        }
                    }
                    else {
                        result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.NONCAPTURE));
                        count--;
                        newY++;
                    }
                }
            }
        }
        return result;
    };
    MoveFactory.getLineForwardNoncapturing = function (piece, length, direction) {
        var result = new MoveCollection();
        if (direction > 0) {
            var count = length;
            var newX = piece.getPos().getX();
            var newY = piece.getPos().getY() - 1;
            while (count > 0) {
                if (piece.getBoardModel().isValidPosition(new Pos(newX, newY))) {
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        break;
                    }
                    else {
                        result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.NONCAPTURE));
                        count--;
                        newY--;
                    }
                }
                else {
                    break;
                }
            }
        }
        if (direction < 0) {
            var count = length;
            var newX = piece.getPos().getX();
            var newY = piece.getPos().getY() + 1;
            while (count > 0) {
                if (piece.getBoardModel().isValidPosition(new Pos(newX, newY))) {
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        break;
                    }
                    else {
                        result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.NONCAPTURE));
                        count--;
                        newY++;
                    }
                }
                else {
                    break;
                }
            }
        }
        return result;
    };
    return MoveFactory;
}());
var PieceModel = /** @class */ (function () {
    function PieceModel(board, pos, color, type) {
        this.pos = pos;
        this.color = color;
        this.boardModel = board;
        this.type = type;
    }
    PieceModel.prototype.getPos = function () {
        return this.pos;
    };
    PieceModel.prototype.getColor = function () {
        return this.color;
    };
    PieceModel.prototype.getBoardModel = function () {
        return this.boardModel;
    };
    PieceModel.prototype.getType = function () {
        return this.type;
    };
    PieceModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getAllUpwards(this);
    };
    PieceModel.prototype.getDirection = function () {
        return this.getBoardModel().getDirection(this.getColor());
    };
    PieceModel.prototype.transformInto = function (type) {
        this.getBoardModel().removePiece(this.getPos());
        this.getBoardModel().addPiece(type, this.getPos().getX(), this.getPos().getY(), this.getColor());
    };
    return PieceModel;
}());
var RookModel = /** @class */ (function (_super) {
    __extends(RookModel, _super);
    function RookModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.ROOK) || this;
    }
    RookModel.prototype.onMove = function () { };
    RookModel.prototype.giveInternalAttributes = function (piece) { };
    RookModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getAllCardinal(this);
    };
    return RookModel;
}(PieceModel));
var PawnModel = /** @class */ (function (_super) {
    __extends(PawnModel, _super);
    function PawnModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.PAWN) || this;
    }
    PawnModel.prototype.onMove = function (move) {
        this.hasMoved = true;
        if (this.getBoardModel().isOnOppositeBackRank(move.getDest(), this.getColor())) {
            this.transformInto(PieceType.QUEEN);
            //alert("I'm promoting!");
            //this.getBoardModel().addPiece();
        }
    };
    PawnModel.prototype.giveInternalAttributes = function (piece) {
        var currPiece = piece;
        currPiece.hasMoved = this.hasMoved;
    };
    PawnModel.prototype.getPossibleMoves = function () {
        if (this.hasMoved) {
            return MoveFactory.getRelativeToPieceNonCapturing(this, 0, -1 * this.getDirection())
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, -1, -1 * this.getDirection()))
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, 1, -1 * this.getDirection()));
        }
        else {
            //alert(MoveFactory.getLineForward(this, 2, this.getDirection()).getMoves.length);
            return MoveFactory.getRelativeToPieceNonCapturing(this, 0, -1 * this.getDirection())
                .addAll(MoveFactory.getLineForwardNoncapturing(this, 2, this.getDirection())
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, -1, -1 * this.getDirection()))
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, 1, -1 * this.getDirection())));
        }
    };
    return PawnModel;
}(PieceModel));
var GiraffeRiderModel = /** @class */ (function (_super) {
    __extends(GiraffeRiderModel, _super);
    function GiraffeRiderModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.GIRAFFE_RIDER) || this;
    }
    GiraffeRiderModel.prototype.onMove = function () { };
    GiraffeRiderModel.prototype.giveInternalAttributes = function (piece) { };
    GiraffeRiderModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getGiraffeMovement(this);
    };
    return GiraffeRiderModel;
}(PieceModel));
var KnightModel = /** @class */ (function (_super) {
    __extends(KnightModel, _super);
    function KnightModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.KNIGHT) || this;
    }
    KnightModel.prototype.onMove = function () { };
    KnightModel.prototype.giveInternalAttributes = function (piece) { };
    KnightModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getRelativeToPiece(this, -2, -1)
            .addAll(MoveFactory.getRelativeToPiece(this, 2, -1))
            .addAll(MoveFactory.getRelativeToPiece(this, -2, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, 2, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, 1, -2))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 2))
            .addAll(MoveFactory.getRelativeToPiece(this, 1, 2))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, -2));
    };
    return KnightModel;
}(PieceModel));
var BishopModel = /** @class */ (function (_super) {
    __extends(BishopModel, _super);
    function BishopModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.BISHOP) || this;
    }
    BishopModel.prototype.onMove = function () { };
    BishopModel.prototype.giveInternalAttributes = function (piece) { };
    BishopModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getAllDiagonal(this);
    };
    return BishopModel;
}(PieceModel));
var KingModel = /** @class */ (function (_super) {
    __extends(KingModel, _super);
    function KingModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.KING) || this;
    }
    KingModel.prototype.onMove = function () { };
    KingModel.prototype.giveInternalAttributes = function (piece) { };
    KingModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getRelativeToPiece(this, 1, 1)
            .addAll(MoveFactory.getRelativeToPiece(this, 1, -1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, -1))
            .addAll(MoveFactory.getRelativeToPiece(this, 0, -1))
            .addAll(MoveFactory.getRelativeToPiece(this, 0, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 0))
            .addAll(MoveFactory.getRelativeToPiece(this, 1, 0));
    };
    return KingModel;
}(PieceModel));
var QueenModel = /** @class */ (function (_super) {
    __extends(QueenModel, _super);
    function QueenModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.QUEEN) || this;
    }
    QueenModel.prototype.onMove = function () { };
    QueenModel.prototype.giveInternalAttributes = function (piece) { };
    QueenModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getAllCardinal(this)
            .addAll(MoveFactory.getAllDiagonal(this));
    };
    return QueenModel;
}(PieceModel));
var GeneralModel = /** @class */ (function (_super) {
    __extends(GeneralModel, _super);
    function GeneralModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.GENERAL) || this;
    }
    GeneralModel.prototype.onMove = function () { };
    GeneralModel.prototype.giveInternalAttributes = function (piece) { };
    GeneralModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getRelativeToPiece(this, 0, -1)
            .addAll(MoveFactory.getRelativeToPiece(this, 0, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 0))
            .addAll(MoveFactory.getRelativeToPiece(this, 1, 0));
    };
    return GeneralModel;
}(PieceModel));
var MinisterModel = /** @class */ (function (_super) {
    __extends(MinisterModel, _super);
    function MinisterModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.MINISTER) || this;
    }
    MinisterModel.prototype.onMove = function () { };
    MinisterModel.prototype.giveInternalAttributes = function (piece) { };
    MinisterModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getRelativeToPiece(this, 1, 1)
            .addAll(MoveFactory.getRelativeToPiece(this, 1, -1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, -1));
    };
    return MinisterModel;
}(PieceModel));
var WarMachineModel = /** @class */ (function (_super) {
    __extends(WarMachineModel, _super);
    function WarMachineModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.WAR_MACHINE) || this;
    }
    WarMachineModel.prototype.onMove = function () { };
    WarMachineModel.prototype.giveInternalAttributes = function (piece) { };
    WarMachineModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getRelativeToPiece(this, -2, 0)
            .addAll(MoveFactory.getRelativeToPiece(this, 2, 0))
            .addAll(MoveFactory.getRelativeToPiece(this, 0, 2))
            .addAll(MoveFactory.getRelativeToPiece(this, 0, -2));
    };
    return WarMachineModel;
}(PieceModel));
var PicketModel = /** @class */ (function (_super) {
    __extends(PicketModel, _super);
    function PicketModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.PICKET) || this;
    }
    PicketModel.prototype.onMove = function () { };
    PicketModel.prototype.giveInternalAttributes = function (piece) { };
    PicketModel.prototype.getPossibleMoves = function () {
        var x = this.getPos().getX();
        var y = this.getPos().getY();
        var invalidMoves = new MoveCollection();
        invalidMoves.add(new Move(this.getPos(), new Pos(x + 1, y + 1), MoveType.NONCAPTURE));
        invalidMoves.add(new Move(this.getPos(), new Pos(x + 2, y + 2), MoveType.NONCAPTURE));
        invalidMoves.add(new Move(this.getPos(), new Pos(x - 1, y + 1), MoveType.NONCAPTURE));
        invalidMoves.add(new Move(this.getPos(), new Pos(x - 2, y + 2), MoveType.NONCAPTURE));
        invalidMoves.add(new Move(this.getPos(), new Pos(x - 1, y - 1), MoveType.NONCAPTURE));
        invalidMoves.add(new Move(this.getPos(), new Pos(x - 2, y - 2), MoveType.NONCAPTURE));
        invalidMoves.add(new Move(this.getPos(), new Pos(x + 1, y - 1), MoveType.NONCAPTURE));
        invalidMoves.add(new Move(this.getPos(), new Pos(x + 2, y - 2), MoveType.NONCAPTURE));
        return MoveFactory.getAllDiagonal(this).minusIgnoreType(invalidMoves);
    };
    return PicketModel;
}(PieceModel));
var ElephantRiderModel = /** @class */ (function (_super) {
    __extends(ElephantRiderModel, _super);
    function ElephantRiderModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.ELEPHANT_RIDER) || this;
    }
    ElephantRiderModel.prototype.onMove = function () { };
    ElephantRiderModel.prototype.giveInternalAttributes = function (piece) { };
    ElephantRiderModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getRelativeToPiece(this, -2, -2)
            .addAll(MoveFactory.getRelativeToPiece(this, 2, -2))
            .addAll(MoveFactory.getRelativeToPiece(this, -2, 2))
            .addAll(MoveFactory.getRelativeToPiece(this, 2, 2));
    };
    return ElephantRiderModel;
}(PieceModel));
var CamelRiderModel = /** @class */ (function (_super) {
    __extends(CamelRiderModel, _super);
    function CamelRiderModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.CAMEL_RIDER) || this;
    }
    CamelRiderModel.prototype.onMove = function () { };
    CamelRiderModel.prototype.giveInternalAttributes = function (piece) { };
    CamelRiderModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getRelativeToPiece(this, -3, -1)
            .addAll(MoveFactory.getRelativeToPiece(this, 3, -1))
            .addAll(MoveFactory.getRelativeToPiece(this, -3, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, 3, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, 1, -3))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 3))
            .addAll(MoveFactory.getRelativeToPiece(this, 1, 3))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, -3));
    };
    return CamelRiderModel;
}(PieceModel));
var CannonModel = /** @class */ (function (_super) {
    __extends(CannonModel, _super);
    function CannonModel(board, pos, color) {
        return _super.call(this, board, pos, color, PieceType.CANNON) || this;
    }
    CannonModel.prototype.onMove = function (move) {
    };
    CannonModel.prototype.giveInternalAttributes = function (piece) {
    };
    CannonModel.prototype.getDirection = function () {
        return this.getBoardModel().getDirection(this.getColor());
    };
    CannonModel.prototype.getPossibleMoves = function () {
        return MoveFactory.getAllLeft(this).addAll(MoveFactory.getAllRight(this))
            .addAll(MoveFactory.getRelativeToPieceFling(this, 0, -3 * this.getDirection()));
    };
    return CannonModel;
}(PieceModel));
var PieceFactory = /** @class */ (function () {
    function PieceFactory() {
    }
    PieceFactory.createPiece = function (board, pos, color, type) {
        var newPiece;
        switch (type) {
            case PieceType.ROOK:
                newPiece = new RookModel(board, pos, color);
                break;
            case PieceType.BISHOP:
                newPiece = new BishopModel(board, pos, color);
                break;
            case PieceType.PAWN:
                newPiece = new PawnModel(board, pos, color);
                break;
            case PieceType.KING:
                newPiece = new KingModel(board, pos, color);
                break;
            case PieceType.KNIGHT:
                newPiece = new KnightModel(board, pos, color);
                break;
            case PieceType.QUEEN:
                newPiece = new QueenModel(board, pos, color);
                break;
            case PieceType.GENERAL:
                newPiece = new GeneralModel(board, pos, color);
                break;
            case PieceType.MINISTER:
                newPiece = new MinisterModel(board, pos, color);
                break;
            case PieceType.GIRAFFE_RIDER:
                newPiece = new GiraffeRiderModel(board, pos, color);
                break;
            case PieceType.WAR_MACHINE:
                newPiece = new WarMachineModel(board, pos, color);
                break;
            case PieceType.CAMEL_RIDER:
                newPiece = new CamelRiderModel(board, pos, color);
                break;
            case PieceType.ELEPHANT_RIDER:
                newPiece = new ElephantRiderModel(board, pos, color);
                break;
            case PieceType.PICKET:
                newPiece = new PicketModel(board, pos, color);
                break;
            case PieceType.CANNON:
                newPiece = new CannonModel(board, pos, color);
                break;
        }
        return newPiece;
    };
    PieceFactory.createPieceByTransposition = function (pos, piece) {
        var newPiece = PieceFactory.createPiece(piece.getBoardModel(), pos, piece.getColor(), piece.getType());
        piece.giveInternalAttributes(newPiece);
        return newPiece;
    };
    return PieceFactory;
}());
var BoardModel = /** @class */ (function () {
    function BoardModel(argWidth, argHeight) {
        this.pos2PieceMap = new Map();
        this.pos2SquareType = new Map();
        this.HEIGHT = argHeight;
        this.WIDTH = argWidth;
        for (var y = 0; y < argHeight; y++) {
            for (var x = 0; x < argWidth; x++) {
                this.pos2PieceMap.set(new Pos(x, y), null);
                this.pos2SquareType.set(new Pos(x, y), SquareType.NORMAL);
            }
        }
    }
    BoardModel.prototype.addPiece = function (type, x, y, color) {
        this.placePiece(PieceFactory.createPiece(this, new Pos(x, y), color, type));
    };
    BoardModel.prototype.placePiece = function (piece) {
        this.pos2PieceMap.set(piece.getPos(), piece);
    };
    BoardModel.prototype.setSquareTypeAtPos = function (pos, type) {
        var _this = this;
        this.pos2SquareType.forEach(function (value, key, map) {
            if (pos.equals(key)) {
                _this.pos2SquareType.set(key, type);
            }
        });
    };
    BoardModel.prototype.getDirection = function (color) {
        if (Color.WHITE == color) {
            return 1;
        }
        else if (Color.BLACK == color) {
            return -1;
        }
    };
    BoardModel.prototype.getBackRank = function (color) {
        var result = new Array();
        if (this.getDirection(color) > 0) {
            for (var i = 0; i < this.getWidth(); i++) {
                result.push(new Pos(i, 0));
            }
        }
        else {
            for (var i = 0; i < this.getWidth(); i++) {
                result.push(new Pos(i, this.getHeight() - 1));
            }
        }
        return result;
    };
    BoardModel.prototype.isOnOppositeBackRank = function (pos, color) {
        var backRank = this.getBackRank(color);
        for (var eachIdx in backRank) {
            var eachPos = backRank[eachIdx];
            if (eachPos.equals(pos)) {
                return true;
            }
        }
        return false;
    };
    BoardModel.prototype.isFree = function (pos) {
        var result;
        this.pos2PieceMap.forEach(function (value, key, map) {
            if (pos.equals(key)) {
                result = (value == null || value == undefined);
            }
        });
        return result;
    };
    BoardModel.prototype.isAllFree = function (positions) {
        for (var posIdx in positions) {
            var eachPosition = positions[posIdx];
            if (!(this.isFree(eachPosition))) {
                return false;
            }
        }
        return true;
    };
    BoardModel.prototype.isCapturable = function (pos, color) {
        return this.isFree(pos);
    };
    BoardModel.prototype.getHeight = function () {
        return this.HEIGHT;
    };
    BoardModel.prototype.getWidth = function () {
        return this.WIDTH;
    };
    BoardModel.prototype.getAllPieces = function () {
        var result = new Array();
        this.pos2PieceMap.forEach(function (value, key, map) {
            if (value != null) {
                result.push(value);
            }
        });
        return result;
    };
    BoardModel.prototype.getAllPiecesOfColor = function (color) {
        var result = new Array();
        this.pos2PieceMap.forEach(function (value, key, map) {
            if (value != null && value != undefined) {
                if (value.getColor() == color) {
                    result.push(value);
                }
            }
        });
        return result;
    };
    BoardModel.prototype.removePiece = function (pos) {
        var _this = this;
        this.pos2PieceMap.forEach(function (value, key, map) {
            if (key.equals(pos)) {
                _this.pos2PieceMap.delete(key);
            }
        });
        this.pos2PieceMap.set(pos, null);
    };
    BoardModel.prototype.executeMove = function (move) {
        var originalPiece = this.getPieceFromPosition(move.getOrigin());
        originalPiece.onMove(move);
        if ((move.getType() == MoveType.NONCAPTURE) || (move.getType() == MoveType.CAPTURE)) {
            this.movePiece(originalPiece.getPos(), move.getDest());
        }
        else if (move.getType() == MoveType.FLING) {
            this.removePiece(move.getDest());
        }
    };
    BoardModel.prototype.movePiece = function (origin, dest) {
        var piece = this.getPieceFromPosition(origin);
        this.removePiece(piece.getPos());
        this.removePiece(dest);
        var transposedPiece = PieceFactory.createPieceByTransposition(dest, piece);
        this.placePiece(transposedPiece);
    };
    BoardModel.prototype.isValidPosition = function (pos) {
        var result = false;
        this.pos2SquareType.forEach(function (value, key, map) {
            if (pos.equals(key)) {
                if (value != SquareType.NON_EXISTENT) {
                    result = true;
                }
            }
        });
        return result;
    };
    BoardModel.prototype.serialize = function () {
        var result = "";
        for (var y = 0; y < this.getHeight(); y++) {
            for (var x = 0; x < this.getWidth(); x++) {
                var thisPiece = this.getPieceFromPosition(new Pos(x, y));
                result += "[";
                if (thisPiece != null) {
                    result += thisPiece.getType() + "_";
                    if (thisPiece.getColor() == Color.BLACK) {
                        result += "B";
                    }
                    else {
                        result += "W";
                    }
                }
                result += "],";
            }
            result = result.substring(0, result.length - 1);
            result += "/";
        }
        result = result.substring(0, result.length - 1);
        result += "-";
        for (var y = 0; y < this.getHeight(); y++) {
            for (var x = 0; x < this.getWidth(); x++) {
                result += "[" + this.getSquareTypeFromPosition(new Pos(x, y)) + "],";
            }
            result = result.substring(0, result.length - 1);
            result += "/";
        }
        result = result.substring(0, result.length - 1);
        return result;
    };
    BoardModel.prototype.reset = function () {
        this.pos2PieceMap.clear();
        this.pos2SquareType.clear();
        for (var y = 0; y < this.getHeight(); y++) {
            for (var x = 0; x < this.getWidth(); x++) {
                this.pos2PieceMap.set(new Pos(x, y), null);
                this.pos2SquareType.set(new Pos(x, y), SquareType.NORMAL);
            }
        }
    };
    BoardModel.prototype.getAllMovesForColor = function (color) {
        var pieces = this.getAllPiecesOfColor(color);
        var resultArr = new MoveCollection();
        for (var pieceIdx in pieces) {
            var eachPiece = pieces[pieceIdx];
            resultArr.addAll(eachPiece.getPossibleMoves());
        }
        return resultArr;
    };
    BoardModel.prototype.populateFromSerial = function (serial) {
        this.reset();
        var halvedData = serial.split("-");
        var configRows = halvedData[1].split("/");
        var rows = halvedData[0].split("/");
        for (var y = 0; y < rows.length; y++) {
            var row = rows[y];
            var squares = row.split(",");
            var length = squares.length;
            for (var x = 0; x < squares.length; x++) {
                var sqrData = squares[x].substring(1, squares[x].length - 1);
                if (sqrData.length != 0) {
                    var sqrDataSplit = sqrData.split("_");
                    var thisColor;
                    if (sqrDataSplit[1] == "W") {
                        thisColor = Color.WHITE;
                    }
                    else {
                        thisColor = Color.BLACK;
                    }
                    this.addPiece(+sqrDataSplit[0], x, y, thisColor);
                }
            }
        }
        for (var y = 0; y < configRows.length; y++) {
            var row = configRows[y];
            var squares = row.split(",");
            var length = squares.length;
            for (var x = 0; x < squares.length; x++) {
                var sqrData = squares[x].substring(1, squares[x].length - 1);
                this.setSquareTypeAtPos(new Pos(x, y), +sqrData);
            }
        }
    };
    BoardModel.prototype.getPieceFromPosition = function (pos) {
        var _this = this;
        var result;
        this.pos2PieceMap.forEach(function (value, key, map) {
            if (pos.equals(key)) {
                result = _this.pos2PieceMap.get(key);
            }
        });
        return result;
    };
    BoardModel.prototype.getSquareTypeFromPosition = function (pos) {
        var _this = this;
        var result;
        this.pos2SquareType.forEach(function (value, key, map) {
            if (pos.equals(key)) {
                result = _this.pos2SquareType.get(key);
            }
        });
        return result;
    };
    return BoardModel;
}());
var BoardFactory = /** @class */ (function () {
    function BoardFactory() {
    }
    BoardFactory.getStandardBoard = function () {
        var board = new BoardModel(8, 8);
        board.populateFromSerial(BoardFactory.STANDARD_BOARD);
        return board;
    };
    BoardFactory.getTamerlaneBoard = function () {
        var board = new BoardModel(13, 10);
        board.populateFromSerial(BoardFactory.TAMERLANE_BOARD);
        return board;
    };
    BoardFactory.testBoard = function () {
        var board = new BoardModel(6, 6);
        board.populateFromSerial(BoardFactory.TEST_BOARD);
        return board;
    };
    BoardFactory.STANDARD_BOARD = "[4_B],[2_B],[3_B],[5_B],[6_B],[3_B],[2_B],[4_B]/[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W]/[4_W],[2_W],[3_W],[5_W],[6_W],[3_W],[2_W],[4_W]-[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]";
    BoardFactory.TAMERLANE_BOARD = "[],[12_B],[],[13_B],[],[7_B],[],[7_B],[],[13_B],[],[12_B],[]/[],[4_B],[2_B],[11_B],[10_B],[9_B],[6_B],[8_B],[10_B],[11_B],[2_B],[4_B],[]/[],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[]/[],[],[],[],[],[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[],[],[],[],[],[]/[],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[]/[],[4_W],[2_W],[11_W],[10_W],[9_W],[6_W],[8_W],[10_W],[11_W],[2_W],[4_W],[]/[],[12_W],[],[13_W],[],[7_W],[],[7_W],[],[13_W],[],[12_W],[]-[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]";
    BoardFactory.TEST_BOARD = "[],[1_B],[],[1_B],[],[]/[],[],[6_B],[],[],[]/[],[],[],[],[],[]/[],[],[],[],[],[]/[],[],[15_W],[],[],[]/[],[],[6_W],[],[],[]-[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0]";
    return BoardFactory;
}());
var Player = /** @class */ (function () {
    function Player(color) {
        this.color = color;
    }
    Player.prototype.getColor = function () {
        return this.color;
    };
    Player.prototype.readyForMove = function () { };
    Player.prototype.afterMove = function (board) { };
    Player.prototype.beforeMove = function (board) { };
    Player.prototype.onGameEnd = function () { };
    return Player;
}());
var MiniMaxPlayer = /** @class */ (function (_super) {
    __extends(MiniMaxPlayer, _super);
    function MiniMaxPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiniMaxPlayer.prototype.getNextMove = function (board) {
        var moves = board.getAllMovesForColor(this.getColor());
        moves.shuffle();
        var bestValuation = Number.MAX_SAFE_INTEGER * -1;
        var bestMove = this.rootMiniMax(board, 2, this.getColor());
        return bestMove;
    };
    MiniMaxPlayer.prototype.rootMiniMax = function (board, depth, color) {
        var bestMove;
        var bestValuation = Number.MAX_SAFE_INTEGER * -1;
        var alpha = Number.MAX_SAFE_INTEGER * -1;
        var beta = Number.MAX_SAFE_INTEGER;
        var maxMoves = board.getAllMovesForColor(color);
        maxMoves.shuffle();
        for (var maxMoveIdx in maxMoves.getMoves()) {
            var eachMaxMove = maxMoves.getMoves()[maxMoveIdx];
            var currentValuation = this.minimax(eachMaxMove, board, depth - 1, this.swapColor(color), alpha, beta, false);
            if (currentValuation >= bestValuation) {
                bestValuation = currentValuation;
                bestMove = eachMaxMove;
            }
        }
        return bestMove;
    };
    MiniMaxPlayer.prototype.minimax = function (move, board, depth, color, alpha, beta, maximize) {
        var newBoard = this.applyMove(move, board);
        if (depth == 0) {
            return this.evaluate(newBoard, color);
        }
        var bestValuation;
        if (maximize) {
            bestValuation = Number.MAX_SAFE_INTEGER * -1;
            var maxMoves = newBoard.getAllMovesForColor(color);
            maxMoves.shuffle();
            for (var maxMoveIdx in maxMoves.getMoves()) {
                var eachMaxMove = maxMoves.getMoves()[maxMoveIdx];
                bestValuation = Math.max(bestValuation, this.minimax(eachMaxMove, newBoard, depth - 1, this.swapColor(color), alpha, beta, false));
                alpha = Math.max(alpha, bestValuation);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        else if (!maximize) {
            bestValuation = Number.MAX_SAFE_INTEGER;
            var minMoves = newBoard.getAllMovesForColor(color);
            minMoves.shuffle();
            for (var minMoveIdx in minMoves.getMoves()) {
                var eachMinMove = minMoves.getMoves()[minMoveIdx];
                bestValuation = Math.min(bestValuation, this.minimax(eachMinMove, newBoard, depth - 1, this.swapColor(color), alpha, beta, true));
                beta = Math.min(beta, bestValuation);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestValuation;
    };
    MiniMaxPlayer.prototype.swapColor = function (color) {
        if (color == Color.BLACK) {
            return Color.WHITE;
        }
        else {
            return Color.BLACK;
        }
    };
    MiniMaxPlayer.prototype.applyMove = function (move, board) {
        var newBoard = new BoardModel(board.getWidth(), board.getHeight());
        newBoard.populateFromSerial(board.serialize());
        newBoard.executeMove(move);
        return newBoard;
    };
    MiniMaxPlayer.prototype.evaluate = function (board, color) {
        var result = 0;
        /*result += board.getAllPiecesOfColor(color).length;
        result -= board.getAllPiecesOfColor(this.swapColor(color)).length;*/
        result += this.getMaterial(board, color);
        result += (this.getMobility(board, color) * 0.01);
        return result;
    };
    MiniMaxPlayer.prototype.getMaterial = function (board, color) {
        var pieces = board.getAllPieces();
        var value = 0;
        for (var pieceIdx in pieces) {
            var eachPiece = pieces[pieceIdx];
            var thisValue = 0;
            switch (eachPiece.getType()) {
                case PieceType.ROOK:
                    thisValue += 5;
                    break;
                case PieceType.PAWN:
                    thisValue += 1;
                    break;
                case PieceType.QUEEN:
                    thisValue += 9;
                    break;
                case PieceType.KNIGHT:
                    thisValue += 3;
                    break;
                case PieceType.BISHOP:
                    thisValue += 3;
                    break;
                case PieceType.GIRAFFE_RIDER:
                    thisValue += 4;
                    break;
                case PieceType.GENERAL:
                    thisValue += 1;
                    break;
                case PieceType.MINISTER:
                    thisValue += 1;
                    break;
                case PieceType.CAMEL_RIDER:
                    thisValue += 3;
                    break;
                case PieceType.ELEPHANT_RIDER:
                    thisValue += 3;
                    break;
                case PieceType.WAR_MACHINE:
                    thisValue += 2;
                    break;
                case PieceType.PICKET:
                    thisValue += 2;
                    break;
                case PieceType.KING:
                    thisValue += 1000;
                    break;
            }
            if (eachPiece.getColor() == color) {
                value += thisValue;
            }
            else {
                value -= thisValue;
            }
        }
        return value;
    };
    MiniMaxPlayer.prototype.getMobility = function (board, color) {
        var myMoves = board.getAllMovesForColor(color);
        var oppMoves = board.getAllMovesForColor(this.swapColor(color));
        return myMoves.getMoves().length - oppMoves.getMoves().length;
    };
    MiniMaxPlayer.prototype.isAutoExecute = function () {
        return true;
    };
    return MiniMaxPlayer;
}(Player));
var GameHTMLContainer = /** @class */ (function () {
    function GameHTMLContainer(parentElement) {
        this.parentElement = parentElement;
    }
    GameHTMLContainer.prototype.setBoardHTML = function (html) {
        this.boardElement = html;
    };
    GameHTMLContainer.prototype.setAlertTextHTML = function (html) {
        this.alertTextElement = html;
    };
    GameHTMLContainer.prototype.setThrobberHTML = function (html) {
        this.throbberElement = html;
    };
    GameHTMLContainer.prototype.turnOnAlertText = function () {
        this.alertTextOn = true;
    };
    GameHTMLContainer.prototype.turnOffAlertText = function () {
        this.alertTextOn = false;
    };
    GameHTMLContainer.prototype.turnOnThrobber = function () {
        this.throbberOn = true;
    };
    GameHTMLContainer.prototype.turnOffThrobber = function () {
        this.throbberOn = false;
    };
    GameHTMLContainer.prototype.update = function () {
        var newHTML = this.boardElement;
        if (this.alertTextOn) {
            newHTML += this.alertTextElement;
        }
        if (this.throbberOn) {
            newHTML += this.throbberElement;
        }
        this.parentElement.innerHTML = newHTML;
    };
    return GameHTMLContainer;
}());
var ChessGame = /** @class */ (function () {
    function ChessGame(board, white, black) {
        this.white = white;
        this.black = black;
        this.board = board;
    }
    ChessGame.prototype.start = function () {
        this.currentTurn = Color.WHITE;
        this.getCurrentPlayer().readyForMove();
    };
    ChessGame.prototype.executeNextMove = function () {
        var _this = this;
        if (!this.isFinished()) {
            var move = this.getCurrentPlayer().getNextMove(this.board);
            this.getCurrentPlayer().beforeMove(this.board);
            this.board.executeMove(move);
            this.getCurrentPlayer().afterMove(this.board);
            if (this.hasLost(this.swapColor(this.currentTurn))) {
                this.hasFinished = true;
            }
            this.swapPlayers();
        }
        else {
            this.white.onGameEnd();
            this.black.onGameEnd();
        }
        setTimeout(function () {
            if (!_this.isFinished()) {
                if (_this.getCurrentPlayer().isAutoExecute()) {
                    _this.executeNextMove();
                }
                else {
                    _this.getCurrentPlayer().readyForMove();
                }
            }
            else {
                //this.getCurrentPlayer().afterMove(this.board);
                _this.white.onGameEnd();
                _this.black.onGameEnd();
            }
        }, 10);
    };
    ChessGame.prototype.swapPlayers = function () {
        if (this.currentTurn == Color.WHITE) {
            return this.currentTurn = Color.BLACK;
        }
        else {
            return this.currentTurn = Color.WHITE;
        }
    };
    ChessGame.prototype.getCurrentPlayer = function () {
        if (this.currentTurn == Color.WHITE) {
            return this.white;
        }
        else {
            return this.black;
        }
    };
    ChessGame.prototype.isFinished = function () {
        return this.hasFinished;
    };
    ChessGame.prototype.hasLost = function (color) {
        var pieces = this.board.getAllPiecesOfColor(color);
        for (var pieceIdx in pieces) {
            var eachPiece = pieces[pieceIdx];
            if (eachPiece.getType() == PieceType.KING) {
                return false;
            }
        }
        return true;
    };
    ChessGame.prototype.isInCheck = function (color) {
        var pieces = this.board.getAllPiecesOfColor(color);
        for (var pieceIdx in pieces) {
            var eachPiece = pieces[pieceIdx];
            if (eachPiece.getType() == PieceType.KING) {
                if (this.board.getAllMovesForColor(this.swapColor(color)).containsDestination(eachPiece.getPos())) {
                    return true;
                }
            }
        }
        return false;
    };
    ChessGame.prototype.swapColor = function (color) {
        if (color == Color.BLACK) {
            return Color.WHITE;
        }
        else {
            return Color.BLACK;
        }
    };
    return ChessGame;
}());
var ConsoleEntry = /** @class */ (function (_super) {
    __extends(ConsoleEntry, _super);
    function ConsoleEntry(left, top, width, height, text) {
        var _this = _super.call(this) || this;
        _this.setTopPos(top);
        _this.setLeftPos(left);
        _this.setWidth(width);
        _this.setHeight(height);
        _this.setText(text);
        return _this;
    }
    ConsoleEntry.prototype.setText = function (text) {
        this.text = text;
    };
    ConsoleEntry.prototype.getText = function () {
        return this.text;
    };
    ConsoleEntry.prototype.toHTML = function () {
        var innerDiv = "{msg}";
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px")
            .addStyle("font-size", this.getHeight() + "px")
            .addStyle("border", "1px solid black");
        builder.addInnerDiv(innerDiv.replace("{msg}", this.getText()));
        return builder.toString();
    };
    return ConsoleEntry;
}(HTMLObject));
var MyConsole = /** @class */ (function (_super) {
    __extends(MyConsole, _super);
    function MyConsole(leftPos, upPos, consoleWidth, consoleHeight, entryHeight) {
        var _this = _super.call(this) || this;
        _this.lines = new Array();
        _this.consoleHeight = consoleHeight;
        _this.consoleWidth = consoleWidth;
        _this.entryHeight = entryHeight;
        _this.setHeight(_this.consoleHeight);
        _this.setWidth(_this.consoleWidth);
        _this.setLeftPos(leftPos);
        _this.setTopPos(upPos);
        _this.setId("my-console");
        return _this;
    }
    MyConsole.prototype.addEntry = function (text) {
        var newEntry = new ConsoleEntry(0, (this.entryHeight * (this.lines.length)) - 1, this.getWidth() - 20, this.entryHeight, text);
        this.lines.push(newEntry);
    };
    MyConsole.prototype.toHTML = function () {
        var text = "";
        for (var lineIdx in this.lines) {
            text += this.lines[lineIdx].toHTML();
        }
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("overflow-y", "scroll")
            .addStyle("position", "absolute")
            .addStyle("border", "1px solid black")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px")
            .setId(this.getId());
        builder.addInnerDiv(text);
        return builder.toString();
    };
    return MyConsole;
}(HTMLObject));
var ConsoleController = /** @class */ (function () {
    function ConsoleController(leftOffset, topOffset, width, height, entrySize) {
        this.console = new MyConsole(leftOffset, topOffset, width, height, entrySize);
    }
    ConsoleController.prototype.run = function () {
        this.update();
    };
    ConsoleController.prototype.log = function (txt) {
        this.console.addEntry(txt);
        this.update();
    };
    ConsoleController.prototype.update = function () {
        document.body.innerHTML += this.console.toHTML();
        var element = document.getElementById("my-console");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    };
    return ConsoleController;
}());
var GameController = /** @class */ (function (_super) {
    __extends(GameController, _super);
    function GameController(htmlContainer, offsetTop, offsetLeft, squareWidth, squareHeight) {
        var _this = _super.call(this, Color.WHITE) || this;
        _this.myColor = Color.WHITE;
        _this.htmlContainer = htmlContainer;
        _this.offsetTop = offsetTop;
        _this.offsetLeft = offsetLeft;
        _this.squareWidth = squareWidth;
        _this.squareHeight = squareHeight;
        return _this;
    }
    GameController.prototype.start = function () {
        //var board: BoardModel = BoardFactory.getTamerlaneBoard();
        var board = BoardFactory.testBoard();
        this.throbber = new Throbber(this.squareWidth * 2, this.squareHeight * 2, 99);
        this.throbber.centerInSquare(this.offsetLeft, this.offsetTop, this.squareWidth * board.getWidth(), this.squareHeight * board.getHeight());
        this.htmlContainer.setThrobberHTML(this.throbber.toHTML());
        this.alertText = new AlertText(this.squareWidth * 2, this.squareHeight * 2, 100);
        this.alertText.centerInSquare(this.offsetLeft, this.offsetTop, this.squareWidth * board.getWidth(), this.squareHeight * board.getHeight());
        this.consoleCtrl = new ConsoleController(this.offsetLeft, this.offsetTop + (this.squareWidth * board.getWidth()), this.squareWidth * 8, this.squareWidth * 2, 50);
        this.boardView = Board.fromSerial(board.serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        var miniMaxAI = new MiniMaxPlayer(Color.BLACK);
        this.chessGame = new ChessGame(board, this, miniMaxAI);
        this.update();
        this.chessGame.start();
    };
    GameController.prototype.update = function () {
        this.htmlContainer.setBoardHTML(this.boardView.toHTML());
        this.htmlContainer.update();
        if (this.chessGame.currentTurn == this.getColor()) {
            this.addClickListeners();
        }
        else {
            this.turnOffClickListeners();
        }
    };
    GameController.prototype.turnOffClickListeners = function () {
        var squares = this.boardView.getSquares();
        for (var square in squares) {
            var each = squares[square];
            this.setElementOnClick(each.getId(), function () { });
        }
    };
    GameController.prototype.addClickListeners = function () {
        this.addMyPieceClickListeners();
        this.addOppPieceClickListeners();
        this.addSquareClickListeners();
    };
    GameController.prototype.addMyPieceClickListeners = function () {
        var pieces = this.boardView.getPieces();
        for (var piece in pieces) {
            var each = pieces[piece];
            if (each.getColor() == this.getColor()) {
                var coSqr = this.boardView.getSquareAtPos(each.getPos());
                //document.getElementById(coSqr.getId()).onclick = this.getMyPieceClickListenerFunction(coSqr.getId());
                this.setElementOnClick(coSqr.getId(), this.getMyPieceClickListenerFunction(coSqr.getId(), this));
            }
        }
    };
    GameController.prototype.log = function (txt) {
        if (this.consoleCtrl) {
            this.consoleCtrl.log(txt);
        }
    };
    GameController.prototype.turnOnThrobber = function () {
        this.htmlContainer.turnOnThrobber();
    };
    GameController.prototype.getMyPieceClickListenerFunction = function (id, control) {
        return function () {
            if (!control.myPieceIsSelected()) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_BLUE);
            }
            else if (control.myPieceIsSelected() && control.selectedPieceIsAtSquareId(id)) {
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if (control.myPieceIsSelected() && !control.selectedPieceIsAtSquareId(id)) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_BLUE);
            }
            else if (control.myPieceIsSelected() && !(control.representsMovableSpace(id))) {
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if (control.myPieceIsSelected() && control.representsMovableSpace(id)) {
                var sqr = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr, MoveType.CAPTURE);
                control.signalOpponentsMove();
            }
        };
    };
    GameController.prototype.addOppPieceClickListeners = function () {
        var pieces = this.boardView.getPieces();
        for (var piece in pieces) {
            var each = pieces[piece];
            if (each.getColor() == this.swapColor(this.getColor())) {
                var coSqr = this.boardView.getSquareAtPos(each.getPos());
                this.setElementOnClick(coSqr.getId(), this.getOppPieceClickListenerFunction(coSqr.getId(), this));
            }
        }
    };
    GameController.prototype.getOppPieceClickListenerFunction = function (id, control) {
        return function () {
            if (!control.oppPieceIsSelected() && !control.myPieceIsSelected()) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if (control.oppPieceIsSelected() && !control.selectedPieceIsAtSquareId(id)) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if (control.oppPieceIsSelected() && control.selectedPieceIsAtSquareId(id)) {
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if (control.myPieceIsSelected() && !(control.representsMovableSpace(id))) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if (control.myPieceIsSelected() && control.representsMovableSpace(id)) {
                var sqr = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr, MoveType.CAPTURE);
            }
        };
    };
    GameController.prototype.addSquareClickListeners = function () {
        var squares = this.boardView.getSquares();
        for (var square in squares) {
            var each = squares[square];
            if (this.hasNoClickListener(each.getId())) {
                this.setElementOnClick(each.getId(), this.getSquareClickListenerFunction(each.getId(), this));
            }
        }
    };
    GameController.prototype.getSquareClickListenerFunction = function (id, control) {
        return function () {
            if (control.oppPieceIsSelected()) {
                control.unselectPiece();
                control.resetSquareColors();
            }
            else if (control.myPieceIsSelected() && control.representsMovableSpace(id)) {
                var sqr = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr, MoveType.NONCAPTURE);
            }
            else if (control.myPieceIsSelected() && !(control.representsMovableSpace(id))) {
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
        };
    };
    GameController.prototype.hasNoClickListener = function (id) {
        return document.getElementById(id).onclick == null || document.getElementById(id).onclick == undefined;
    };
    GameController.prototype.getBoardModel = function () {
        return this.chessGame.board;
    };
    GameController.prototype.swapColor = function (color) {
        if (color == Color.BLACK) {
            return Color.WHITE;
        }
        else {
            return Color.BLACK;
        }
    };
    GameController.prototype.setElementOnClick = function (id, func) {
        document.getElementById(id).onclick = func;
    };
    GameController.prototype.setSelectedPiece = function (piece) {
        this.SELECTED_PIECE = piece;
    };
    GameController.prototype.myPieceIsSelected = function () {
        return ((this.SELECTED_PIECE != null && this.SELECTED_PIECE != undefined) && this.SELECTED_PIECE.getColor() == this.getColor());
    };
    GameController.prototype.representsMovableSpace = function (id) {
        var moves = this.SELECTED_PIECE.getPossibleMoves();
        var sqr = this.boardView.getSquareById(id);
        var thisMove = new Move(this.SELECTED_PIECE.getPos(), new Pos(sqr.getX(), sqr.getY()), MoveType.NONEXECUTABLE);
        return moves.containsIgnoreType(thisMove);
    };
    GameController.prototype.oppPieceIsSelected = function () {
        return ((this.SELECTED_PIECE != null && this.SELECTED_PIECE != undefined) && this.SELECTED_PIECE.getColor() == this.swapColor(this.getColor()));
    };
    GameController.prototype.getSquareAtId = function (id) {
        return this.boardView.getSquareById(id);
    };
    GameController.prototype.tracePieceMoves = function (piece, hex) {
        var moves = piece.getPossibleMoves();
        this.setSquaresToColor(moves, hex);
        this.setSquareToColor(piece.getPos(), hex);
        this.setSelectedPiece(piece);
        this.update();
    };
    GameController.prototype.moveSelectedPieceToSquare = function (sqr, type) {
        this.turnOffClickListeners();
        var move = new Move(this.SELECTED_PIECE.getPos(), sqr.getPos(), type);
        this.setChosenMove(move);
        this.unselectPiece();
        this.resetSquareColors();
        this.signalOpponentsMove();
    };
    GameController.prototype.getPieceAtSquareId = function (id) {
        var sqr = this.getSquareAtId(id);
        var result = this.getBoardModel().getPieceFromPosition(sqr.getPos());
        return result;
    };
    GameController.prototype.unselectPiece = function () {
        this.SELECTED_PIECE = null;
    };
    GameController.prototype.resetSquareColors = function () {
        this.boardView.unselectAllSquares();
    };
    GameController.prototype.signalOpponentsMove = function () {
        this.turnOffClickListeners();
        this.chessGame.executeNextMove();
    };
    GameController.prototype.getNextMove = function (board) {
        return this.getChosenMove();
    };
    GameController.prototype.getChosenMove = function () {
        return this.CHOSEN_MOVE;
    };
    GameController.prototype.setChosenMove = function (move) {
        this.CHOSEN_MOVE = move;
    };
    GameController.prototype.isAutoExecute = function () {
        return false;
    };
    GameController.prototype.afterMove = function (board) {
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        this.doCheckLogging();
        this.turnOnThrobber();
        this.update();
        this.turnOffClickListeners();
    };
    GameController.prototype.beforeMove = function (board) {
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        this.update();
        this.turnOffClickListeners();
    };
    GameController.prototype.setSquareToColor = function (pos, hex) {
        var eachSqr = this.boardView.getSquareAtPos(pos);
        eachSqr.setHexColor(hex);
    };
    GameController.prototype.selectedPieceIsAtSquareId = function (id) {
        var sqr = this.getSquareAtId(id);
        if (this.SELECTED_PIECE.getPos().equals(sqr.getPos())) {
            return true;
        }
        return false;
    };
    GameController.prototype.setSquaresToColor = function (moves, hex) {
        for (var moveIdx in moves.getMoves()) {
            var eachMove = moves.getMoves()[moveIdx];
            var eachSqr = this.boardView.getSquareAtPos(eachMove.getDest());
            eachSqr.setHexColor(hex);
        }
    };
    GameController.prototype.doCheckLogging = function () {
        if (this.chessGame.isInCheck(this.getColor())) {
            this.showAlertText("Check!");
            return true;
        }
        else if (this.chessGame.isInCheck(this.swapColor(this.getColor()))) {
            this.showAlertText("Check!");
            return true;
        }
        else if (this.chessGame.hasLost(this.getColor())) {
            this.showAlertText("You Lose!");
            return true;
        }
        else if (this.chessGame.hasLost(this.swapColor(this.getColor()))) {
            this.showAlertText("You Win!");
            return true;
        }
        return false;
    };
    GameController.prototype.showAlertText = function (txtToShow) {
        var _this = this;
        var lock = true;
        this.alertText.setContent(txtToShow);
        this.htmlContainer.setAlertTextHTML(this.alertText.toHTML());
        this.htmlContainer.turnOnAlertText();
        this.htmlContainer.update();
        setTimeout(function () {
            _this.htmlContainer.turnOffAlertText();
            _this.htmlContainer.update();
            _this.addClickListeners();
        }, 3000);
    };
    GameController.prototype.readyForMove = function () {
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        this.turnOffThrobber();
        this.update();
        if (!this.doCheckLogging()) {
            this.addClickListeners();
        }
    };
    GameController.prototype.turnOffThrobber = function () {
        this.htmlContainer.turnOffThrobber();
    };
    GameController.prototype.onGameEnd = function () {
        this.turnOffThrobber();
        this.doCheckLogging();
    };
    return GameController;
}(Player));
var Preloader = /** @class */ (function () {
    function Preloader() {
    }
    Preloader.preload = function () {
        for (var i = 0; i < Preloader.imageLinks.length; i++) {
            var newImage = new Image();
            newImage.src = Preloader.imageLinks[i];
            Preloader.images.push(newImage);
        }
    };
    Preloader.imageLinks = new Array("http://v3.preloaders.net/preloaders/5/colored/5.png", "https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif");
    Preloader.images = new Array();
    return Preloader;
}());
var CSSClass = /** @class */ (function () {
    function CSSClass(name) {
        this.styles = {};
        this.name = name;
    }
    CSSClass.prototype.addStyle = function (type, value) {
        this.styles[type] = value;
    };
    CSSClass.prototype.toString = function () {
        var result = "";
        result += "." + this.name + "{";
        for (var each in this.styles) {
            result += each + ": " + this.styles[each] + "; ";
        }
        result += "}";
        return result;
    };
    return CSSClass;
}());
var CSSManager = /** @class */ (function () {
    function CSSManager() {
    }
    CSSManager.initAndApply = function () {
        CSSManager.addSpinning();
        CSSManager.addSqr();
        CSSManager.apply();
    };
    CSSManager.apply = function () {
        var style = document.createElement("style");
        var styleString = "";
        for (var classIdx in CSSManager.classes) {
            var eachClass = CSSManager.classes[classIdx];
            styleString += eachClass.toString();
        }
        for (var rawIdx in CSSManager.raw) {
            var eachRaw = CSSManager.raw[rawIdx];
            styleString += eachRaw.toString();
        }
        style.innerHTML += styleString;
        document.getElementsByTagName('head')[0].appendChild(style);
    };
    CSSManager.addSpinning = function () {
        var spinClass = new CSSClass("spin");
        spinClass.addStyle("animation", "3s rotate linear infinite");
        CSSManager.addClass(spinClass);
        CSSManager.addRaw("@keyframes rotate {from {transform: rotate(0deg);} to {transform: rotate(360deg);}}");
    };
    CSSManager.addSqr = function () {
        var sqrClass = new CSSClass("sqr");
        sqrClass.addStyle("height", "30px");
        sqrClass.addStyle("width", "30px");
        sqrClass.addStyle("background", "red");
        CSSManager.addClass(sqrClass);
    };
    CSSManager.addClass = function (clazz) {
        CSSManager.classes.push(clazz);
    };
    CSSManager.addRaw = function (raw) {
        CSSManager.raw.push(raw);
    };
    CSSManager.classes = new Array();
    CSSManager.raw = new Array();
    return CSSManager;
}());
var GameBox = /** @class */ (function () {
    function GameBox() {
    }
    GameBox.start = function () {
        Preloader.preload();
        CSSManager.initAndApply();
        var container = new GameHTMLContainer(document.body);
        var game = new GameController(container, 100, 100, 50, 50);
        game.start();
    };
    return GameBox;
}());
var BoardBuilderHTMLContainer = /** @class */ (function () {
    function BoardBuilderHTMLContainer(parentElement) {
        this.parentElement = parentElement;
    }
    BoardBuilderHTMLContainer.prototype.init = function () {
        this.xInput = this.createXInput();
        this.yInput = this.createYInput();
        this.newBoardButton = this.createNewBoardButton();
        this.switchColorsButton = this.createSwitchColorsButton();
        var xInputContainer = document.createElement('div');
        xInputContainer.id = "xInputContainer";
        xInputContainer.innerHTML += "Width: ";
        xInputContainer.appendChild(this.xInput);
        var yInputContainer = document.createElement('div');
        yInputContainer.id = "yInputContainer";
        yInputContainer.innerHTML += "Height: ";
        yInputContainer.appendChild(this.yInput);
        var board_div = document.createElement('iframe');
        board_div.id = "board-div";
        board_div.scrolling = "no";
        board_div.frameBorder = "0";
        board_div.style["seamless"] = "seamless";
        board_div.style.overflow = "hidden";
        this.boardDiv = board_div;
        var breakDiv = document.createElement('br');
        var breakDiv2 = document.createElement('br');
        var breakDiv3 = document.createElement('br');
        var outputDiv = document.createElement('textarea');
        outputDiv.rows = 8;
        outputDiv.cols = 100;
        this.outputDiv = outputDiv;
        var pieceTypeContainer = this.createPieceTypeContainer();
        this.pieceTypesContainer = pieceTypeContainer;
        this.parentElement.appendChild(xInputContainer);
        this.parentElement.appendChild(yInputContainer);
        this.parentElement.appendChild(this.newBoardButton);
        this.parentElement.appendChild(this.switchColorsButton);
        this.parentElement.appendChild(pieceTypeContainer);
        this.parentElement.appendChild(breakDiv);
        this.parentElement.appendChild(board_div);
        this.parentElement.appendChild(breakDiv2);
        this.parentElement.appendChild(outputDiv);
    };
    BoardBuilderHTMLContainer.prototype.update = function () {
        this.updateBoardHTML();
        this.outputDiv.value = this.boardView.serialize();
    };
    BoardBuilderHTMLContainer.prototype.updateBoardHTML = function () {
        this.boardDiv.contentDocument.body.innerHTML = this.boardView.toHTML();
        this.boardDiv.height = this.boardView.getPixelHeight() + 5 + "px";
        this.boardDiv.width = this.boardView.getPixelWidth() + 5 + "px";
    };
    BoardBuilderHTMLContainer.prototype.getBoardView = function () {
        return this.boardView;
    };
    BoardBuilderHTMLContainer.prototype.getTypeSquares = function () {
        return this.typeSquares;
    };
    BoardBuilderHTMLContainer.prototype.getXInput = function () {
        return this.xInput;
    };
    BoardBuilderHTMLContainer.prototype.getYInput = function () {
        return this.yInput;
    };
    BoardBuilderHTMLContainer.prototype.getNewBoardButton = function () {
        return this.newBoardButton;
    };
    BoardBuilderHTMLContainer.prototype.setBoardView = function (board) {
        this.boardView = board;
    };
    BoardBuilderHTMLContainer.prototype.setXInput = function (element) {
        this.xInput = element;
    };
    BoardBuilderHTMLContainer.prototype.setYInput = function (element) {
        this.yInput = element;
    };
    BoardBuilderHTMLContainer.prototype.setNewBoardButton = function (element) {
        this.newBoardButton = element;
    };
    BoardBuilderHTMLContainer.prototype.setAllPieceTypesToColor = function (color) {
        var typesContainer = document.getElementById("typesContainer");
        while (typesContainer.hasChildNodes()) {
            typesContainer.removeChild(typesContainer.lastChild);
        }
        for (var pieceType in PieceType) {
            var piece = new Piece(0, 0, 50, 50, 0, color, +pieceType);
            var newElement = this.createDivFromString(piece.toHTML());
            newElement.id = "piece_type_" + pieceType;
            newElement.style.position = null;
            newElement.style.left = null;
            newElement.style.top = null;
            newElement.style["pointer-events"] = null;
            newElement.style["float"] = "left";
            typesContainer.appendChild(newElement);
        }
    };
    BoardBuilderHTMLContainer.prototype.createXInput = function () {
        var xInput = document.createElement('input');
        xInput.id = "xInput";
        return xInput;
    };
    BoardBuilderHTMLContainer.prototype.createYInput = function () {
        var yInput = document.createElement('input');
        yInput.id = "yInput";
        return yInput;
    };
    BoardBuilderHTMLContainer.prototype.createNewBoardButton = function () {
        var newBoardButton = document.createElement('button');
        newBoardButton.id = "newBoardButton";
        newBoardButton.innerHTML = "Create New Board";
        return newBoardButton;
    };
    BoardBuilderHTMLContainer.prototype.createSwitchColorsButton = function () {
        var switchColors = document.createElement('button');
        switchColors.id = "switchColorsButton";
        switchColors.innerHTML = "Switch Colors";
        return switchColors;
    };
    BoardBuilderHTMLContainer.prototype.createPieceTypeContainer = function () {
        var typesContainer = document.createElement('div');
        typesContainer.id = "typesContainer";
        typesContainer.style.height = "50px";
        typesContainer.style.width = "100%";
        typesContainer.style.display = "inline-block";
        for (var pieceType in PieceType) {
            var piece = new Piece(0, 0, 50, 50, 0, Color.WHITE, +pieceType);
            var newElement = this.createDivFromString(piece.toHTML());
            newElement.id = "piece_type_" + pieceType;
            newElement.style.position = null;
            newElement.style.left = null;
            newElement.style.top = null;
            newElement.style["pointer-events"] = null;
            newElement.style["float"] = "left";
            typesContainer.appendChild(newElement);
        }
        return typesContainer;
    };
    BoardBuilderHTMLContainer.prototype.getBoardSquares = function () {
        return this.boardView.getSquares();
    };
    BoardBuilderHTMLContainer.prototype.getBoardSquareFromId = function (id) {
        return this.boardView.getSquareById(id);
    };
    BoardBuilderHTMLContainer.prototype.getSquareElementFromId = function (id) {
        return this.boardDiv.contentDocument.getElementById(id);
    };
    BoardBuilderHTMLContainer.prototype.createDivFromString = function (html) {
        var newElement = document.createElement('div');
        newElement.innerHTML = html;
        return newElement.firstChild;
    };
    BoardBuilderHTMLContainer.prototype.getPieceTypeDivs = function () {
        var result = new Array();
        var children = this.pieceTypesContainer.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            result.push(child);
        }
        return result;
    };
    BoardBuilderHTMLContainer.prototype.revertAllPieceTypeBorders = function () {
        var children = this.pieceTypesContainer.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            child.style.border = null;
        }
    };
    return BoardBuilderHTMLContainer;
}());
var BoardBuilderController = /** @class */ (function () {
    function BoardBuilderController(container) {
        this.selectedColor = Color.WHITE;
        this.container = container;
    }
    BoardBuilderController.prototype.start = function () {
        this.getContainer().init();
        this.setNewBoardButtonListener();
        this.setAllPieceTypeListeners();
    };
    BoardBuilderController.prototype.setElementOnClick = function (id, func) {
        document.getElementById(id).onclick = func;
    };
    BoardBuilderController.prototype.update = function () {
        this.getContainer().update();
        this.setAllClickListeners();
    };
    BoardBuilderController.prototype.setAllClickListeners = function () {
        this.setAllBoardSquareListeners();
        //this.setAllSquareTypeListerners();
    };
    BoardBuilderController.prototype.setNewBoardButtonListener = function () {
        var newBoardButton = this.getContainer().getNewBoardButton();
        this.setElementOnClick("newBoardButton", this.getNewBoardButtonOnClickFunction(this));
        this.setElementOnClick("switchColorsButton", this.getSwitchColorsOnClickFunction(this));
    };
    BoardBuilderController.prototype.setAllBoardSquareListeners = function () {
        var sqrs = this.getContainer().getBoardSquares();
        for (var sqrIdx in sqrs) {
            var eachSqr = sqrs[sqrIdx];
            //this.setElementOnClick(eachSqr.getId(), this.getBoardSquareOnClickFunction(eachSqr.getId(), this));
            this.getContainer().getSquareElementFromId(eachSqr.getId()).onclick = this.getBoardSquareOnClickFunction(eachSqr.getId(), this);
        }
    };
    BoardBuilderController.prototype.setAllPieceTypeListeners = function () {
        var pieces = this.getContainer().getPieceTypeDivs();
        for (var eachPieceIdx in pieces) {
            var eachPieceDiv = pieces[eachPieceIdx];
            eachPieceDiv.onclick = this.getPieceTypeClickListener(eachPieceDiv, this);
        }
    };
    /*setAllSquareTypeListerners(){
        var sqrs = this.getContainer().getTypeSquares();
        for(var sqrIdx in sqrs){
            var eachSqr = sqrs[sqrIdx];
            this.setElementOnClick(eachSqr.getId(), this.getSquareTypeOnClickFunction(eachSqr.getId(), this));
        }
    }*/
    BoardBuilderController.prototype.getContainer = function () {
        return this.container;
    };
    BoardBuilderController.prototype.getNewBoardButtonOnClickFunction = function (controller) {
        return function () {
            var currentX = document.getElementById("xInput").value;
            var currentY = document.getElementById("yInput").value;
            var newBoard = new Board(+currentX, +currentY, 0, 0);
            controller.getContainer().setBoardView(newBoard);
            controller.update();
        };
    };
    /*getSquareTypeOnClickFunction(id: string, controller: BoardBuilderController){
        return new function ()
        {
            this.selectedSquareType = controller.getContainer().getTypeSquareFromId(id).getType();
            this.selectedSquareType = controller.getContainer().getTypeSquareFromId(id).getType();
        };
    }*/
    BoardBuilderController.prototype.getBoardSquareOnClickFunction = function (id, controller) {
        return function () {
            var sqr = controller.getContainer().getBoardSquareFromId(id);
            if (controller.selectedPieceType == null) {
                if (sqr.getType() == SquareType.NORMAL) {
                    sqr.setType(SquareType.NON_EXISTENT);
                }
                else {
                    sqr.setType(SquareType.NORMAL);
                }
            }
            else {
                if (controller.getContainer().boardView.getPieceAtPos(sqr.getPos()) == null) {
                    controller.getContainer().boardView.addPiece(controller.selectedPieceType, sqr.getX(), sqr.getY(), controller.selectedColor);
                }
                else {
                    controller.getContainer().boardView.removePieceAtPos(sqr.getPos());
                }
            }
            //sqr.setType(this.selectedSquareType);
            controller.update();
        };
    };
    BoardBuilderController.prototype.getPieceTypeClickListener = function (eachPieceDiv, boardBuilderController) {
        return function () {
            boardBuilderController.getContainer().revertAllPieceTypeBorders();
            var pieceType = +(eachPieceDiv.id.substring(11, eachPieceDiv.id.length));
            if (pieceType == boardBuilderController.selectedPieceType) {
                boardBuilderController.selectedPieceType = null;
            }
            else {
                eachPieceDiv.style.border = "1px solid black";
                boardBuilderController.selectedPieceType = pieceType;
            }
        };
    };
    BoardBuilderController.prototype.getSwitchColorsOnClickFunction = function (boardBuilderController) {
        var _this = this;
        return function () {
            if (boardBuilderController.selectedColor == Color.WHITE) {
                boardBuilderController.selectedColor = Color.BLACK;
            }
            else {
                boardBuilderController.selectedColor = Color.WHITE;
            }
            boardBuilderController.getContainer().setAllPieceTypesToColor(boardBuilderController.selectedColor);
            setTimeout(function () { _this.setAllPieceTypeListeners(); }, 10);
        };
    };
    return BoardBuilderController;
}());
var BoardBuilder = /** @class */ (function () {
    function BoardBuilder() {
    }
    BoardBuilder.start = function () {
        var container = new BoardBuilderHTMLContainer(document.body);
        var controller = new BoardBuilderController(container);
        controller.start();
    };
    return BoardBuilder;
}());
//BoardBuilder.start();
GameBox.start();