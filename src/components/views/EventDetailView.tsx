import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Share2, Ticket, Users, Clock, Info } from 'lucide-react';
import { safeFormatDate, optimizeImage } from '../../lib/utils';
import { Event } from '../../types';

interface EventDetailViewProps {
  event: Event;
  onBack: () => void;
}

export const EventDetailView = ({ event, onBack }: EventDetailViewProps) => {
  return (
    <motion.div 
      key="event-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto py-10 space-y-12"
    >
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left: Visual & Details */}
        <div className="lg:w-2/5 space-y-8 lg:sticky lg:top-24">
          <button 
            onClick={onBack} 
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest px-1"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Retour à l'agenda
          </button>
          
          <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200 group">
             <img 
               src={optimizeImage(event.image || '', 1200, 'contain')} 
               alt={event.title}
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
             <div className="absolute bottom-8 left-8 right-8">
                <div className="flex gap-2 mb-4">
                  <div className="bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                    {event.category}
                  </div>
                </div>
                <h1 className="text-white text-3xl font-black italic leading-[1.1] tracking-tighter">{event.title}</h1>
             </div>
          </div>

          <div className="flex justify-center gap-6">
             <button className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
                <Share2 size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Partager</span>
             </button>
             <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors group">
                <Info size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Signaler</span>
             </button>
          </div>
        </div>

        {/* Right: Info & CTA */}
        <div className="lg:w-3/5 space-y-12 pt-8 lg:pt-14">
           <div className="space-y-12">
             {/* Key Info Bento */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-3">
                   <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Calendar size={22} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</p>
                      <p className="font-black text-xl italic tracking-tight">{safeFormatDate(event.date, 'dd MMMM yyyy')}</p>
                   </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-3">
                   <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                      <Clock size={22} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Heure</p>
                      <p className="font-black text-xl italic tracking-tight">À partir de 19:00</p>
                   </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-3 col-span-2">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                         <MapPin size={28} />
                      </div>
                      <div className="flex-1">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lieu de l'événement</p>
                         <p className="font-black text-2xl italic tracking-tight leading-tight">{event.location}</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                   <Users size={16} /> À propos de l'événement
                </h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                  {event.content || "Aucune description détaillée n'est disponible pour cet événement. Veuillez contacter l'organisateur pour plus d'informations."}
                </div>
             </div>

             {/* Participation Card */}
             <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 African-pattern opacity-10 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                   <div className="flex-1 space-y-3 text-center md:text-left">
                      <h4 className="text-3xl font-black italic tracking-tighter leading-none">Voulez-vous participer ?</h4>
                      <p className="text-slate-400 font-medium text-sm">Inscrivez-vous pour recevoir les rappels et les directions exclusives.</p>
                   </div>
                   <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shrink-0">
                      <Ticket size={24} /> S'INSCRIRE
                   </button>
                </div>
             </div>

             <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-3">
                {['Culture', 'VIP', 'Abidjan', 'Musique', 'Art'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:border-primary transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
