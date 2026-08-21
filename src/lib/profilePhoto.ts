import fs from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";

/**
 * 顔写真が public/ に実在するか。
 *
 * ファイルが無いまま <Image> を出すと画像最適化エンドポイントが
 * 400 を返し、コンソールにエラーが残る。描画前にここで判定して、
 * 無ければ最初からプレースホルダを出す。
 *
 * サーバー側でのみ呼ぶこと。
 */
export function hasProfilePhoto(): boolean {
    if (!profile.photo) return false;

    try {
        const relative = profile.photo.replace(/^\/+/, "");
        return fs.existsSync(path.join(process.cwd(), "public", relative));
    } catch {
        return false;
    }
}
