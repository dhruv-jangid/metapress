type AlertDialogOptions = {
  title: string;
  description?: string;
  actionLabel?: string;
  onConfirm: () => void | Promise<void>;
};

let open = $state(false);
let options = $state<AlertDialogOptions | null>(null);

export function show(opts: AlertDialogOptions) {
  options = opts;
  open = true;
}

export const alertDialog = {
  get open() {
    return open;
  },
  set open(v) {
    open = v;
  },
  get options() {
    return options;
  },
  async confirm() {
    await options?.onConfirm();
    open = false;
  },
};
