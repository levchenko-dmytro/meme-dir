import { Card, Image } from "@heroui/react";
import { useEffect, useState } from "react";
import { getMemes } from "../api/memes";
import { MemeInter } from "../type/meme";

export default function MemeList() {
  const [memes, setMemes] = useState<MemeInter[]>([]);

  useEffect(() => {
    getMemes().then(setMemes);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {memes.map(meme => (
        <Card key={meme.id}>
          <Image src={meme.image} alt={meme.title} className="w-full max-w-lg object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">{meme.title}</h3>
            <p>Лайки: {meme.likes}</p>
            <a
              href={meme.image}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              Переглянути зображення
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
