/**
 * ============================================================
 *  個人情報はこのファイルにだけ置く。
 * ============================================================
 *
 *  下の値を手で書き換えてください。表示側のコンポーネントは
 *  この profile を参照するだけなので、レイアウトを直すときに
 *  このファイルを開く必要はありません。
 *
 *  空文字 "" のままにした項目は ENTRY CARD の行ごと非表示に
 *  なります。出したくない項目は空のままで構いません。
 *
 *  顔写真は public/ 直下に置き、photo にそのパスを書きます。
 *  （例: public/profile.jpg なら photo: "/profile.jpg"）
 *  ファイルが無い場合はプレースホルダが表示されます。
 */

export interface Profile {
    /** 氏名。例: 山田 太郎 */
    fullName: string;
    /** 氏名のローマ字表記。掲示板の英字行に使う。例: YAMADA TARO */
    fullNameEn: string;
    /** ハンドルネーム */
    handle: string;
    /** 所属。例: ○○大学 大学院 ○○研究科 */
    affiliation: string;
    /** 学年。例: M1 */
    grade: string;
    /** 肩書き */
    title: string;
    /** 顔写真のパス。正方形推奨 */
    photo: string;
}

export const profile: Profile = {
    fullName: "",
    fullNameEn: "",
    handle: "skphooh",
    affiliation: "",
    grade: "",
    title: "大学院生 / Fullstack Engineer",
    photo: "/profile.jpg",
};
