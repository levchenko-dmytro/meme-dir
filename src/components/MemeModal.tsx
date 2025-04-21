import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Form,
} from "@heroui/react";
import { MemeInter } from "../type/meme";
import { validator } from "../helpers/validator";
import { FormEvent, useState } from "react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedMeme: MemeInter;
  setSelected: (meme: MemeInter | null) => void
  handleEdit: (meme: MemeInter) => void
}

export default function MemeModal(props: Props) {
  const { handleEdit, setSelected, selectedMeme, isOpen, onOpenChange } = props
  const [errors, setErrors] = useState({
    title: "",
    image: "",
    likes: "",
  })

  const handleButtonPress = (arg: MemeInter | null, fn: () => void) => {
    if (arg) handleEdit(arg);
    setSelected(null)
    fn();
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>, close: () => void) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget))

    const data: MemeInter = {
      ...selectedMeme,
      ...formData,
      likes: !formData.likes ? 0 : parseInt(formData.likes as string)
    };

    const dataErrors = validator(data);

    if (dataErrors.image || dataErrors.title || dataErrors.likes) {
      setErrors(dataErrors);
      return;
    }

    handleEdit(data)
    setSelected(null)
    close()
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit meme</ModalHeader>
              <ModalBody>
                <Form
                  className="p-4"
                  onSubmit={(e) => onFormSubmit(e, onClose)}
                  validationErrors={errors}

                >
                  <Input
                    isRequired
                    errorMessage={errors.title}
                    label="Meme title"
                    labelPlacement="outside"
                    name="title"
                    placeholder="Meme title..."
                    type="text"
                    defaultValue={selectedMeme.title}
                    onChange={() => errors.title && setErrors({ ...errors, title: "" })}
                  />

                  <Input
                    isRequired
                    errorMessage={errors.image}
                    label="Image Url"
                    labelPlacement="outside"
                    name="image"
                    placeholder="Url..."
                    type="url"
                    defaultValue={selectedMeme.image}
                    onChange={() => errors.image && setErrors({ ...errors, image: "" })}
                  />
                  <Input
                    errorMessage={errors.likes}
                    label="Likes"
                    labelPlacement="outside"
                    name="likes"
                    type="number"
                    defaultValue={String(selectedMeme.likes)}
                    onChange={() => {
                      if (errors.likes) {
                        setErrors({ ...errors, likes: "" })
                        }
                      }}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button color="primary" type="submit">
                      Save
                    </Button>
                    <Button type="button" variant="flat" onPress={() => handleButtonPress(null, onClose)}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
