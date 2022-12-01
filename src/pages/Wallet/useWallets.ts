import {
  useCreateWalletService,
  useDeleteWalletByIdService,
  useWalletsService,
} from "services/useWalletService";
import useSnackbarAlert from "hooks/useSnackbar";
// import { useEffect } from "react";
import { useModal } from "hooks";
// import { useFormik } from "formik";

// const initialValues = {
//   wallet_type: "",
//   label: "",
//   address: "",
// };

export const useWallets = () => {
  const { setSnackbar } = useSnackbarAlert();
  const { openModal, closeModal } = useModal();

  const [createWalletService] = useCreateWalletService();
  const { data, refetch: refetchWallets } = useWalletsService({
    page: 1,
    limit: 100,
    search_text: "",
  });
  const { deleteWalletById } = useDeleteWalletByIdService();

  const addWallet = async (values: any) => {
    // console.log("incomming values", values);
    const walletInput = {
      wallet_type: values.wallet_type,
      label: values.label,
      address: values.address,
    };
    // console.log("walletInput", walletInput);
    const res = await createWalletService(walletInput, () => {});

    // console.log(res);
    if (!res) {
      setSnackbar({ message: "Failed to Add new Wallet", variant: "error" });

      return;
    }

    if (res) {
      setSnackbar({
        message: "New Wallet was created",
        variant: "success",
      });

      refetchWallets();
      return;
    }
  };

  const handleDeleteWallet = async (wallet: any) => {
    openModal({
      name: "delete-confirmation-modal",
      data: {
        closeModal: () => closeModal("delete-confirmation-modal"),
        deleteItem: async () => {
          const res = await deleteWalletById(wallet.id);
          if (res.success) {
            await refetchWallets();
            setSnackbar({
              message: "Wallet successfully deleted",
              variant: "success",
            });
            closeModal("delete-confirmation-modal");
          }
          if (!res.success) {
            setSnackbar({
              message: "Wallet delete failed",
              variant: "error",
            });
          }
        },
        label: "Are you sure you want to delete this wallet?",
        title: "Delete wallet",
      },
    });
  };

  //   useEffect(() => {
  //     refetchWallets();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   const formik = useFormik({
  //     initialValues: initialValues,
  //     onSubmit: async (values) => handleSubmit(values),
  //     // validationSchema:projectValidationSchema
  //   });

  //   console.log("Wallet data", data);

  return {
    // formik,
    addWallet,
    data,
    handleDeleteWallet,
  };
};
