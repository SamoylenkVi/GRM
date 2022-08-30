import { deleteSync } from "del"

export const reset = done => {
    deleteSync(app.path.clean);
    done();
}