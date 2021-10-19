// type Nullable<T> = T | null;

// const TYPE_ERROR = 'Something wrong with type of input param';

// const tree = (lvl: number | string): Nullable<string> => {
//   if (typeof lvl !== 'number' && typeof lvl !== 'string') {
//     throw new Error(TYPE_ERROR);
//   }
//   const levelNumber = Number(lvl);
//   if (levelNumber < 3) return null;
//   const widthBranch = levelNumber + (levelNumber - 3);
//   const middleBranch = Math.floor(widthBranch / 2);
//   const treeArray: string[][] = [];
//   let i = 0;
//   while (i < levelNumber) {
//     const startReplace = middleBranch - i;
//     const endReplace = middleBranch + i;
//     const branch = [];
//     let j = 0;
//     while (j < widthBranch) {
//       if (j <= endReplace && j >= startReplace) {
//         if (i === levelNumber - 1) {
//           if (j === middleBranch) {
//             branch.push('|');
//           } else {
//             branch.push(' ');
//           }
//         } else {
//           branch.push('*');
//         }
//       } else {
//         branch.push(' ');
//       }
//       j++;
//     }
//     branch.push('\n');
//     treeArray.push(branch);
//     i++;
//   }

//   return treeArray.flat().join('');
// };
// console.log(tree(8));
// export default tree;

type Nullable<T> = T | null;

const TYPE_ERROR = 'Something wrong with type of input param';

const tree = (lvl: number | string): Nullable<string> => {
  if (typeof lvl !== 'number' && typeof lvl !== 'string') {
    throw new Error(TYPE_ERROR);
  }
  const numLevel = +lvl;
  if (numLevel < 3) return null;
  const MAXLENGTH = 2 * (numLevel - 2) + 1;
  let star = 1;
  return new Array(numLevel)
    .fill(' '.repeat(MAXLENGTH))
    .reduce((resTree, item, index) => {
      const emptySide = item.slice(0, (MAXLENGTH - 1) / 2);
      const side = item.slice(0, (MAXLENGTH - star) / 2);
      if (index === numLevel - 1) {
        item = emptySide + '|' + emptySide;
      } else {
        item = side + '*'.repeat(star) + side;
      }
      star += 2;
      return resTree + item.toString() + '\n';
    }, '');
};
export default tree;

console.log(tree(8));
