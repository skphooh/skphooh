/**
 * ============================================================
 *  体育会水泳部の所属。環境変数から読む。
 * ============================================================
 *
 *  団体名に大学名が入るため、profile.ts と同じく値はソースに
 *  置かない。設定先は .env.local と Vercel の環境変数。
 *
 *  ※ サーバー専用。表示するコンポーネントへは props で渡すこと。
 *
 *  name が空文字のあいだは、ENTRY CARD の CLUB 行も
 *  SEASON LOG の項目も出ない。丸ごと非表示になる。
 */

export interface Club {
    /** 団体名 */
    name: string;
    /** 在籍期間 */
    period: string;
    /** 種目や役職 */
    detail: string;
}

export const club: Club = {
    name: process.env.CLUB_NAME ?? "",
    period: process.env.CLUB_PERIOD ?? "",
    detail: process.env.CLUB_DETAIL ?? "",
};
