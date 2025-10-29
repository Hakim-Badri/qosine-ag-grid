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
} from "ag-grid-community";
import { CellSelectionModule, ClipboardModule } from "ag-grid-enterprise";


// register only community modules we need
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
    CellSelectionModule,
    ClipboardModule
]);