import { AvatarIcon } from "@radix-ui/react-icons";
import { StyledUploadLogo } from "modals/CreateProjectModal";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";

type PlayerFormType = {
  useHook: any;
};

const PlayerForm = ({ useHook }: PlayerFormType) => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType } = useHook();
  const { avatar } = formik?.values;

  return (
    <>
      <CustomTextField
        name="unique_id"
        placeholder="Unique Id"
        label="Player unique Id"
        mandatory
      />

      <StyledUploadLogo
        name={"avatar"}
        onChange={(e: any) => handleChangeFile(e, "avatar")}
        placeholder={"Upload Avatar image"}
        fileUploadType={fileUploadType}
        img={avatar}
        label={"Avatar"}
        description={
          "This image will also be used for navigation. 350 x 350 recommended."
        }
        uploadIcon={
          <AvatarIcon style={{ width: 50, height: 50, color: "#fff" }} />
        }
        onDeleteImg={() => onDeleteImg("avatar")}
      />

      <CustomTextField
        name="name"
        placeholder="Name"
        label="Name"
        // mandatory
      />
    </>
  );
};

export default PlayerForm;
