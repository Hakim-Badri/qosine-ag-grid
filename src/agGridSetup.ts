import {
    ModuleRegistry,
    ValidationModule,
    ClientSideRowModelModule,
    RowSelectionModule,
    TextEditorModule,
    RowApiModule,
    ColumnAutoSizeModule,
    TextFilterModule,
    NumberFilterModule,
    UndoRedoEditModule,
    CellStyleModule,
    ClientSideRowModelApiModule,
} from "ag-grid-community";
import {
    ClipboardModule,
    CellSelectionModule,
} from "ag-grid-enterprise";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RowSelectionModule,
    TextEditorModule,
    ValidationModule,
    RowApiModule,
    ColumnAutoSizeModule,
    TextFilterModule,
    NumberFilterModule,
    UndoRedoEditModule,
    CellStyleModule,
    ClientSideRowModelApiModule,
    CellSelectionModule,
    ClipboardModule
]);
