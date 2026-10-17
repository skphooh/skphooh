/**
 * ============================================================
 *  個人情報は環境変数から読む。ここに値をハードコードしない。
 * ============================================================
 *
 *  このリポジトリは公開されているため、氏名や所属をソースに
 *  直接書くと git の履歴に永久に残る。値は次の場所に置く:
 *
 *    ローカル … .env.local （.gitignore 済み）
 *    本番     … Vercel の Environment Variables
 *
 *  キー名の一覧は .env.example を参照。
 *
 *  ※ サーバー専用。process.env はクライアントバンドルからは
 *    読めないので、この値を表示するコンポーネントには
 *    サーバーコンポーネント側から props で渡すこと。
 *
 *  空文字の項目は ENTRY CARD の行ごと非表示になる。
 */

export interface Profile {
    /** 氏名 */
    fullName: string;
    /** 氏名のローマ字表記 */
    fullNameEn: string;
    /** 氏名の別表記（異体字など）。検索用の別名として構造化データに入れる */
    fullNameAliases: string[];
    /** ハンドルネーム */
    handle: string;
    /** 所属 */
    affiliation: string;
    /** 学年 */
    grade: string;
    /** 肩書き */
    title: string;
    /** 顔写真のパス。public/ 配下に置く */
    photo: string;
}

export const profile: Profile = {
    fullName: process.env.PROFILE_FULL_NAME ?? "",
    fullNameEn: process.env.PROFILE_FULL_NAME_EN ?? "",
    fullNameAliases: (process.env.PROFILE_FULL_NAME_ALIASES ?? "")
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean),
    affiliation: process.env.PROFILE_AFFILIATION ?? "",
    grade: process.env.PROFILE_GRADE ?? "",
    title: process.env.PROFILE_TITLE ?? "",

    // 以下は個人を特定しないのでソースに置く
    handle: "skphooh",
    photo: "/profile.png",
};
