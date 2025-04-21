import { MemeInter } from "../type/meme";

enum Errors {
  Title = "Назва повинна бути від 3 до 100 символів",
  Image = `Введіть адресу картинки у "https://....", картинка має мати розширення ".jpg"`,
  Likes = "Кількість лайків від 0 до 99",
}

interface ErrorsInter {
    title: string;
    image: string;
    likes: string;
}

export function validator(meme: MemeInter) {
  const likesRegExp = new RegExp(/^(?:[0-9]|[1-9][0-9])$/);
  const imageRegExp = new RegExp(/^https?:\/\/[^\s/$.?#].[^\s]*$/);

  const hasErrors = <ErrorsInter>{};

  for (const key in meme) {
    switch (key) {
      case "title":
        if (meme.title.length < 3 || meme.title.length > 100) {
          hasErrors.title = Errors.Title;
        }
        break;

      case "likes":
        console.log(String(meme.likes).match(likesRegExp))
        if (!String(meme.likes).match(likesRegExp)) {
          hasErrors.likes = Errors.Likes;
        }

        break;

      case "image": {
        if (!meme.image.match(imageRegExp)) {
          hasErrors.image = Errors.Likes;
        }

        break;
      }

      default:
        break;
    }
  }

  return hasErrors;
}
