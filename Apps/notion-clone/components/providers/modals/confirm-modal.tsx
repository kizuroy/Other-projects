"use client";

import * as Alerts from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
};

export const ConfirmModal = ({
    children,
    onConfirm,
    
}: ConfirmModalProps) => {

    const handleConfirm = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        e.stopPropagation();
        onConfirm();
    };

    return(
        <Alerts.AlertDialog>
            <Alerts.AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                {children}
            </Alerts.AlertDialogTrigger>
            <Alerts.AlertDialogContent>
                <Alerts.AlertDialogHeader>
                    <Alerts.AlertDialogTitle>
                        Are you sure you want to delete this file?
                    </Alerts.AlertDialogTitle>
                    <Alerts.AlertDialogDescription>
                        This action cannot be undone.
                    </Alerts.AlertDialogDescription>
                </Alerts.AlertDialogHeader>
                <Alerts.AlertDialogFooter>
                    <Alerts.AlertDialogCancel onClick={e => e.stopPropagation()}>
                        NO
                    </Alerts.AlertDialogCancel>
                    <Alerts.AlertDialogAction onClick={handleConfirm}>
                        YES
                    </Alerts.AlertDialogAction>
                </Alerts.AlertDialogFooter>
            </Alerts.AlertDialogContent>
        </Alerts.AlertDialog>
    )
};
