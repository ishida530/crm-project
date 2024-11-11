import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Project, Task } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ProjectCardListProps {
    data: Project[];
    onAddProject: () => void;
    onEditProject: (project: Project) => void;
    onDeleteProject: (projectId: number) => void;
}

export default function ProjectCardList({ data, onAddProject, onEditProject, onDeleteProject }: ProjectCardListProps) {

    const [filter, setFilter] = useState("");
    const filteredData = data.filter(
        project =>
            project.name.toLowerCase().includes(filter.toLowerCase()) ||
            project.investorRepresentative.toLowerCase().includes(filter.toLowerCase()) ||
            project.projectManager.toLowerCase().includes(filter.toLowerCase())
    );


    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj projekty..."
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="max-w-sm"
                />
                <Button variant="outline" className="ml-4" onClick={onAddProject}>
                    Dodaj projekt
                </Button>
            </div>

            <div className="flex flex-col gap-y-4">
                {filteredData.length ? (
                    filteredData.map((project) => (
                        <Card key={project.id} className="border rounded-md p-4 transition-all hover:shadow-lg">
                            <div className="flex justify-between items-start relative">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
                                    <CardDescription className="text-sm text-gray-500">
                                        Termin: {new Date(project.deadline).toLocaleDateString("pl-PL")}
                                    </CardDescription>

                                </CardHeader>
                                <div className="absolute top-0 right-0 flex gap-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8"
                                        onClick={() => onEditProject(project)}
                                    >
                                        Edytuj
                                    </Button>
                                    {/* Przycisk szczegółów projektu */}

                                </div>
                            </div>

                            <CardContent className="mt-3">
                                <div className="text-sm"><span className="font-semibold">Przedstawiciel inwestora</span>: {project.investorRepresentative}</div>
                                <div className="text-sm"><span className="font-semibold">Menedżer projektu</span>: {project.projectManager}</div>
                            </CardContent>


                            {/* Przycisk "Usuń" na dole karty */}
                            <div className="flex justify-between mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8"
                                >
                                    <Link to={`/projects/${project.id}`} >
                                        Szczegóły projektu
                                    </Link>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="h-8"
                                    onClick={() => onDeleteProject(project.id)}
                                >
                                    Usuń
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-4">Brak wyników.</div>
                )}
            </div>


        </div>
    );
}
