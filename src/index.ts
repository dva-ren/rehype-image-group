import { Root,Element } from "hast";
import { h } from "hastscript";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

export type RehypeEmojiOptions = {
  emojis: Record<string, string>;
  className?: string;
  ignore?: string | string[];
  alt?: boolean;
};

const defaultOptions: RehypeEmojiOptions = {
  emojis: {},
  className: "emoji",
  ignore: "code",
  alt: true,
};

const rehypeImageGroup: Plugin<[RehypeEmojiOptions?], Root> = (
  options: RehypeEmojiOptions
) => {
  function visitor(node: Element,index) {
    console.log('node',node)
  }

  return (tree) => {
    visit(tree, "element", visitor)
  }
}

export default rehypeImageGroup
