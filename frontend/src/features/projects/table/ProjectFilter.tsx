import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableInstance } from "@tanstack/react-table";

interface ProjectFilterProps {
    table: TableInstance;
    onAddProject: () => void;
}

export default function ProjectFilter({ table, onAddProject }: ProjectFilterProps) {
    return (
        <div className="flex items-center justify-between py-4">
            <Input
                placeholder="Filtruj projekty..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={e => table.getColumn("name")?.setFilterValue(e.target.value)}
                className="max-w-sm"
            />
            <Button variant="outline" className="ml-4" onClick={onAddProject}>
                Dodaj projekt
            </Button>
        </div>
    );
}
