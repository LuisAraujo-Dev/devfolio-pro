// src/components/admin/TechSelector.tsx   
'use client';

import { useState } from 'react';
import { Check, Plus } from 'lucide-react';

interface Tech {
  id: string;
  name: string;
}

interface TechSelectorProps {
  availableTechs: Tech[];
  initialSelectedIds: string[];
}

export function TechSelector({ availableTechs, initialSelectedIds }: TechSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds || []);

  const toggleTech = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="space-y-3">
      {/* Botões Visuais */}
      <div className="flex flex-wrap gap-2">
        {availableTechs.map((tech) => {
          const isSelected = selectedIds.includes(tech.id);
          return (
            <button
              key={tech.id}
              type="button" 
              onClick={() => toggleTech(tech.id)}
              className={`
                group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all cursor-pointer
                ${
                  isSelected
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-white/10 bg-surface text-muted hover:border-white/30 hover:text-white'
                }
              `}
            >
              <span>{tech.name}</span>
              {isSelected ? (
                <Check className="size-3" />
              ) : (
                <Plus className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          );
        })}
      </div>

      {selectedIds.map((id) => (
        <input 
          key={id} 
          type="hidden" 
          name="technologies" 
          value={id} 
        />
      ))}
      
      {availableTechs.length === 0 && (
        <p className="text-sm text-muted">
          Nenhuma tecnologia cadastrada.
        </p>
      )}
    </div>
  );
}