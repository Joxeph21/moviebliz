import Button from "./Button";

function ConfirmDelete({
  resourceName,
  onConfirm,
  title,
  disabled,
  message,
  onCloseModal,
  warnText = "Delete",
}) {
  return (
    <div className="flex w-80 flex-col gap-3 p-4 text-gray-50">
      <h className="text-center">
        {title ? title : `Delete ${resourceName} ?`}
      </h>
      <p className="mb-3 text-center text-neutral-500">
        {!message
          ? `Are you sure you want to delete your ${resourceName} permanently? This
        action cannot be undone.`
          : message}
      </p>

      <div className="flex justify-around gap-3">
        <Button
          type="secondary"
          size="small"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          type="danger"
          size="small"
          disabled={disabled}
          onClick={onConfirm}
        >
          {warnText}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
