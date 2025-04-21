import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Button,
  TableColumn,
  useDisclosure,
} from "@heroui/react";

import { useEffect, useState } from "react";
import { getMemes, updateMeme } from "../api/memes";
import { MemeInter } from "../type/meme";
import MemeModal from "../components/MemeModal";

export default function MemeTable() {
  const [memes, setMemes] = useState<MemeInter[]>([]);
  const [selected, setSelected] = useState<MemeInter | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    getMemes().then(setMemes);
  }, []);

  const handleEdit = async (meme: MemeInter) => {
    const updated = await updateMeme(meme.id, { ...meme});
    setMemes(prev =>
      prev.map(m => (m.id === meme.id ? updated : m))
    );
  };

  const handleOpenModal = (arg: MemeInter) => {
    setSelected({ ...arg });
    onOpen();
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Likes</TableColumn>
          <TableColumn className="px-4">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id}>
              <TableCell>{meme.id}</TableCell>
              <TableCell>{meme.title}</TableCell>
              <TableCell>{meme.likes}</TableCell>
              <TableCell>
                <Button onPress={() => handleOpenModal({ ...meme })}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selected && (
        <MemeModal
          selectedMeme={selected}
          setSelected={setSelected}
          handleEdit={handleEdit}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
}
