import slugify from "slugify";

export default function createSlug(text: string) {
  return slugify(text, { lower: true });
}
