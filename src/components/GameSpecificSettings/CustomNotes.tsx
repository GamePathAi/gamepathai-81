
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StickyNote, Plus, Save, Trash2, Edit } from "lucide-react";

interface Game {
  id: string;
  name: string;
  image: string;
  isOptimized: boolean;
  genre: string;
  optimizationType?: "network" | "system" | "both" | "none";
}

interface CustomNotesProps {
  game: Game;
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const CustomNotes: React.FC<CustomNotesProps> = ({ game }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Configurações de gráficos ideais",
      content: "Sombras em Médio, Texturas em Alto, DLSS Qualidade, sem Ray Tracing para manter 144 FPS estáveis.",
      date: "15/04/2023"
    },
    {
      id: "2",
      title: "Problemas com servidor US-East",
      content: "Evitar servidores da costa leste dos EUA, apresentam latência alta mesmo com VPN.",
      date: "23/04/2023"
    }
  ]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleNewNote = () => {
    setActiveNote(null);
    setNoteTitle("");
    setNoteContent("");
    setEditMode(true);
  };

  const handleEditNote = (note: Note) => {
    setActiveNote(note);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setEditMode(true);
  };

  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    if (activeNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === activeNote.id 
          ? { ...note, title: noteTitle, content: noteContent, date: dateStr }
          : note
      ));
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(),
        title: noteTitle,
        content: noteContent,
        date: dateStr
      };
      setNotes([...notes, newNote]);
    }

    setEditMode(false);
    setActiveNote(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote?.id === id) {
      setActiveNote(null);
      setEditMode(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Notas Personalizadas</h3>
        <p className="text-sm text-gray-400 mb-6">
          Adicione anotações e lembretes específicos para {game.name}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-tech">Suas Anotações</h4>
              <Button
                variant="outline"
                size="sm"
                className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                onClick={handleNewNote}
              >
                <Plus className="h-4 w-4 mr-1" />
                Nova Nota
              </Button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {notes.map(note => (
                <div 
                  key={note.id}
                  className={`p-3 border cursor-pointer rounded-md transition-colors ${
                    activeNote?.id === note.id 
                      ? 'bg-cyber-purple/10 border-cyber-purple/30' 
                      : 'border-gray-700 hover:border-cyber-purple/20'
                  }`}
                  onClick={() => !editMode && setActiveNote(note)}
                >
                  <div className="flex justify-between items-start">
                    <h5 className="text-sm font-semibold mb-1 truncate">{note.title}</h5>
                    <span className="text-xs text-gray-400">{note.date}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{note.content}</p>
                </div>
              ))}

              {notes.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <StickyNote className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>Nenhuma nota criada</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-cyber-blue/30 bg-cyber-darkblue/70 h-full flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col">
                {editMode ? (
                  <div className="space-y-4 flex-1 flex flex-col">
                    <input
                      type="text"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      placeholder="Título da anotação"
                      className="bg-cyber-darkblue border border-cyber-blue/30 p-2 rounded-md w-full text-sm"
                    />
                    <textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Escreva suas observações, dicas ou lembretes específicos para este jogo..."
                      className="bg-cyber-darkblue border border-cyber-blue/30 p-2 rounded-md w-full text-sm flex-1"
                      style={{ minHeight: "200px" }}
                    />
                    <div className="flex justify-end space-x-2 mt-auto pt-4">
                      <Button
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-800"
                        onClick={() => {
                          setEditMode(false);
                          if (!activeNote) {
                            setActiveNote(null);
                          }
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="cyber"
                        className="border-cyber-green bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green"
                        onClick={handleSaveNote}
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Salvar
                      </Button>
                    </div>
                  </div>
                ) : activeNote ? (
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-tech text-white">{activeNote.title}</h3>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-cyber-blue hover:text-cyber-blue hover:bg-cyber-blue/10"
                          onClick={() => handleEditNote(activeNote)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:text-red-400 hover:bg-red-400/10"
                          onClick={() => handleDeleteNote(activeNote.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">Atualizado em: {activeNote.date}</div>
                    <div className="flex-1">
                      <p className="text-gray-300 whitespace-pre-wrap">{activeNote.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <StickyNote className="h-12 w-12 mb-2 opacity-50" />
                    <p className="mb-4">Selecione uma nota para ver detalhes ou crie uma nova</p>
                    <Button
                      variant="outline"
                      className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10"
                      onClick={handleNewNote}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Nova Nota
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNotes;
