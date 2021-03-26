console.log("merge-button-for-shipjs script start");

const isPullRequest = (pathname: string) => pathname.includes("/pull/");
const generatedByShipjs = (text: string) =>
  text.includes(
    'automatically generated by <a href="https://github.com/algolia/shipjs">Ship.js</a>'
  );

window.addEventListener("load", () => {
  const { pathname } = window.location;
  const lastCommentInnerHTML = document.querySelector(".comment-body")
    .lastElementChild.innerHTML;

  // Pull Requestでない場合、なにもしない
  if (!isPullRequest(pathname)) {
    return;
  }

  // TODO: 別の判断基準を考えたい
  // Ship.jsで作成されたと判断できない場合、なにもしない
  if (!generatedByShipjs(lastCommentInnerHTML)) {
    return;
  }

  // Squash and mergeを選択状態に変更する
  const mergePrContainer = document.querySelector(".merge-pr");
  mergePrContainer.classList.remove("is-merging");
  mergePrContainer.classList.remove("is-rebasing");
  mergePrContainer.classList.add("is-squashing");

  // TODO https://github.com/tatsushitoji/merge-button-for-shipjs/issues/1
  // 他のmerge方法を選べなくしておく(.details-resetを表示させない)
  mergePrContainer.classList.add("hide-details-reset");

  // Squash and mergeボタンの整形
  const squashAndMergeButton = document.querySelector(".btn-group-squash");
  // 角丸の調整
  squashAndMergeButton.classList.remove("rounded-left-1");
  squashAndMergeButton.classList.add("rounded");

  // ラベルに「and :passenger_ship: 」をつける( 🛳️ でいけるかちょっと心配ではあるもののnode-emojiなどを使いたくない)
  squashAndMergeButton.innerHTML = `${squashAndMergeButton.innerHTML} and 🛳️ `;
});
