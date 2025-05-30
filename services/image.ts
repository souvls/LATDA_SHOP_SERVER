import path from "path";
import fs from "fs"
export const _removeIMG = (filename: string) => {
    const imagePath = path.join(__dirname, '..', 'uploads', filename);
    fs.unlink(imagePath, (err) => {
        if (err) console.error('Không thể xóa ảnh:', err);
    });
}