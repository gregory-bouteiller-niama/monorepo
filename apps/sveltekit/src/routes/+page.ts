import { readIndexPage } from "@niama/domain/functions/pages";

export const load = () => ({ ...readIndexPage(), skipTo: "#les-voies" });
