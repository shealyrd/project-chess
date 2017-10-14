class BoardFactory{
    static STANDARD_BOARD: string = "[4_B],[2_B],[3_B],[5_B],[6_B],[3_B],[2_B],[4_B]/[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W]/[4_W],[2_W],[3_W],[5_W],[6_W],[3_W],[2_W],[4_W]";

    static getStandardBoard(): BoardModel{
        var board: BoardModel = new BoardModel(8,8);
        board.populateFromSerial(BoardFactory.STANDARD_BOARD);
        return board;
    }

}