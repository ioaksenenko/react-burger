import { ReactNode } from "react";

export interface IModalState {
    readonly modalIsOpen: boolean;
    readonly modalTitle: string | ReactNode | null;
    readonly modalContent: React.ReactNode;
    readonly modalOnClose: (() => void) | null;
};

export interface IModalStore {
    readonly modal: IModalState;
};