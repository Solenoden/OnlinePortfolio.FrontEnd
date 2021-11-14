import { Injectable } from '@angular/core'
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ComponentType } from '@angular/cdk/overlay'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ModalService {
    public static readonly MinimumDesktopWidthPixels = 768

    constructor(
        private bottomSheet: MatBottomSheet,
        private dialog: MatDialog
    ) {}

    public openResponsiveModal<T>(
        component: ComponentType<T>,
        data: Record<string, unknown>
    ): { afterClosed: Observable<any> } {
        return {
            afterClosed: window.innerWidth < ModalService.MinimumDesktopWidthPixels
                ? this.openBottomSheet<T>(component, data).afterDismissed()
                : this.openDialog<T>(component, data).afterClosed()
        }
    }

    public openBottomSheet<T>(component: ComponentType<T>, data: Record<string, unknown>): MatBottomSheetRef {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return this.bottomSheet.open(component, { data })
    }

    public openDialog<T>(component: ComponentType<T>, data: Record<string, unknown>): MatDialogRef<any> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return this.dialog.open(component, { data })
    }
}