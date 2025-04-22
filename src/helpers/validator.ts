import { MemeInter } from "../type/meme";

enum Errors {
  Title = "Minimum 3 and maximum 100 symbols",
  Image = `Please enter correct url "https://....", allowed only format ".jpg"`,
  Likes = "Likes quantity only from 0 to 99",
}

interface ErrorsInter {
    title: string;
    image: string;
    likes: string;
}

export function validator(meme: MemeInter) {
  const likesRegExp = new RegExp(/^(?:[0-9]|[1-9][0-9])$/);
  const imageRegExp = new RegExp(/^https?:\/\/.+\.jpg$/);

  const hasErrors = <ErrorsInter>{};

  for (const key in meme) {
    switch (key) {
      case "title":
        if (meme.title.length < 3 || meme.title.length > 100) {
          hasErrors.title = Errors.Title;
        }
        break;

      case "likes":
        if (!likesRegExp.test(String(meme.likes))) {
          hasErrors.likes = Errors.Likes;
        }

        break;

      case "image": {
        if (!imageRegExp.test(meme.image)) {
          hasErrors.image = Errors.Image;
        }

        break;
      }

      default:
        break;
    }
  }

  return hasErrors;
}
