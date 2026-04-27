import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Check, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { RUBRICS } from '../../constants';
import { HeroSlideshow } from './HeroSlideshow';
import { FeaturedSection } from './FeaturedSection';
import { CultureSection } from './CultureSection';
import { EventSection } from './EventSection';
import { ArticleCard } from './ArticleCard';
import { NewsletterSignup } from '../NewsletterSignup';
import { ChevronRight } from 'lucide-react';
import { ArticleSkeleton } from '../Skeleton';
import { TrendingSection } from './TrendingSection';
import { PollCard } from '../widgets/PollCard';
import { GoogleAd } from '../widgets/GoogleAd';

interface HomeViewProps {
  activeCategory: string;
  activeSubCategory: string | null;
  onCategoryClick: (cat: string) => void;
  onSubCategoryClick: (sub: string) => void;
  visibleArticles: any[];
  displayedArticles: any[];
  onArticleClick: (article: any) => void;
  adminCulturePosts: any[];
  onPostClick: (post: any) => void;
  onNavigate: (view: string) => void;
  visibleEvents: any[];
  onEventClick: (event: any) => void;
  onBookmark: (e: React.MouseEvent, id: string) => void;
  bookmarkedIds: Set<string>;
  onAuthorClick: (name: string) => void;
  siteSettings: any;
  currentUser: any;
  onShowPreferenceModal: () => void;
  trendingArticles: any[];
  personalizedArticles: any[];
  adminPolls: any[];
  handleVote: (pollId: string, optionId: string) => void;
  onFollowCategory: (cat: string) => void;
  userFollowedCategories: Set<string>;
  loadingRef: React.RefObject<HTMLDivElement>;
}

export const HomeView = ({
  activeCategory,
  activeSubCategory,
  onCategoryClick,
  onSubCategoryClick,
  visibleArticles,
  displayedArticles,
  onArticleClick,
  adminCulturePosts,
  onPostClick,
  onNavigate,
  visibleEvents,
  onEventClick,
  onBookmark,
  bookmarkedIds,
  onAuthorClick,
  siteSettings,
  currentUser,
  onShowPreferenceModal,
  trendingArticles,
  personalizedArticles,
  adminPolls,
  handleVote,
  onFollowCategory,
  userFollowedCategories,
  loadingRef
}: HomeViewProps) => {
  return (
    <motion.div 
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* Rubric Navigation */}
      <div className="space-y-6">
        <div 
          onWheel={(e) => {
            const container = e.currentTarget;
            container.scrollTo({
              left: container.scrollLeft + e.deltaY,
              behavior: 'auto'
            });
          }}
          className="flex flex-nowrap lg:flex-wrap gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 touch-pan-x scroll-smooth border-b border-slate-100 lg:border-none"
        >
          {RUBRICS.map(rubric => (
            <motion.button
              key={rubric.id}
              id={`rubric-tab-${rubric.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryClick(rubric.label)}
              className={cn(
                "px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shrink-0 flex items-center gap-2 border-2",
                activeCategory === rubric.label 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-white text-slate-500 border-slate-100 hover:border-slate-200"
              )}
            >
              <span className="text-sm">{rubric.icon}</span>
              <span>{rubric.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Sub-Category Navigation */}
        <AnimatePresence>
          {RUBRICS.find(r => r.label === activeCategory)?.sub && (
            <motion.div 
              onWheel={(e) => {
                const container = e.currentTarget;
                container.scrollTo({
                  left: container.scrollLeft + e.deltaY,
                  behavior: 'auto'
                });
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-nowrap gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0"
            >
              <button
                onClick={() => onSubCategoryClick(null as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-2",
                  !activeSubCategory 
                    ? "bg-slate-900 text-white border-slate-900" 
                    : "bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100"
                )}
              >
                Tout voir
              </button>
              {RUBRICS.find(r => r.label === activeCategory)?.sub?.map(sub => (
                <button
                  key={sub}
                  onClick={() => onSubCategoryClick(sub)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border-2 flex items-center gap-2",
                    activeSubCategory === sub 
                      ? "bg-slate-900 text-white border-slate-900" 
                      : "bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100"
                  )}
                >
                  <span className="text-sm">
                    {activeCategory === 'INFO PAR PAYS' ? (siteSettings.countries_flags?.[sub] || '🌍') : (activeCategory === 'NOS THEMES' ? (siteSettings.categories_icons?.[sub] || '📚') : '')}
                  </span>
                  {sub}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hierarchy-Specific Sections */}
      {activeCategory === 'SONDAGE' && (
        <section className="space-y-12 py-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse" /> Direct Opinion
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">Sondages & Opinions</h2>
            <p className="text-slate-500 font-medium leading-relaxed">Exprimez votre avis sur les sujets qui comptent. Votre voix participe au débat public et forge la réflexion commune.</p>
          </div>
          {(Array.isArray(adminPolls) ? adminPolls : []).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(Array.isArray(adminPolls) ? adminPolls : []).filter(p => !p.isarchived).map(poll => (
                <div key={poll.id} className="bg-white p-2 rounded-[32px] border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-500">
                  <PollCard poll={poll} onVote={handleVote} hasVoted={(currentUser?.votedpolls || []).includes(poll.id)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 italic bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
              Aucun sondage actif pour le moment. Revenez bientôt !
            </div>
          )}
        </section>
      )}

      {/* Hero Section */}
      {activeCategory === 'À LA UNE' && visibleArticles.length > 0 && (
        <section className="space-y-10">
          <HeroSlideshow 
            articles={visibleArticles.slice(0, 3)} 
            onArticleClick={onArticleClick} 
            onBookmark={onBookmark}
            bookmarkedIds={bookmarkedIds}
            onAuthorClick={onAuthorClick}
            categoryIcons={siteSettings?.categories_icons}
          />

          <FeaturedSection 
            articles={visibleArticles} 
            onArticleClick={onArticleClick}
            categoryIcons={siteSettings?.categories_icons}
          />

          {currentUser && userFollowedCategories.size === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <Star size={32} fill="currentColor" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black italic tracking-tight uppercase">Personnalisez votre Journal</h3>
                <p className="text-slate-500 font-medium">Choisissez vos thématiques favorites pour un flux qui vous ressemble.</p>
              </div>
              <button 
                onClick={onShowPreferenceModal}
                className="px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
              >
                Configurer
              </button>
            </motion.div>
          )}

          {personalizedArticles.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                    < Star size={20} fill="currentColor" />
                  </div>
                  <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tighter italic">Pour Vous</h2>
                </div>
                <button 
                  onClick={onShowPreferenceModal}
                  className="text-primary text-xs font-bold uppercase tracking-widest hover:underline"
                >
                  Modifier mes préférences
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {personalizedArticles?.map(article => (
                  <ArticleCard 
                    key={article.id}
                    article={article}
                    variant="vertical"
                    onClick={() => onArticleClick(article)}
                    onBookmark={onBookmark}
                    isBookmarked={bookmarkedIds.has(article.id)}
                    onAuthorClick={onAuthorClick}
                  />
                ))}
              </div>
              <hr className="border-slate-100 mt-10" />
            </section>
          )}

          <hr className="border-slate-100 my-10" />
          
          <TrendingSection 
            articles={trendingArticles}
            onArticleClick={onArticleClick}
            onBookmark={onBookmark}
            bookmarkedIds={bookmarkedIds}
            onAuthorClick={onAuthorClick}
            categoryIcons={siteSettings?.categories_icons}
            onSeeMore={() => onCategoryClick('Articles')}
          />

          <hr className="border-slate-100 my-10" />
          <GoogleAd className="my-10" label="Annonce à la une" />
        </section>
      )}

      {/* Grid Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-black text-2xl md:text-3xl uppercase tracking-tighter italic">
              {activeCategory === 'À LA UNE' ? <span className="text-red-600">Dernières Nouvelles</span> : activeCategory}
            </h2>
          </div>
          {activeCategory !== 'À LA UNE' && (
            <button 
              onClick={() => onFollowCategory(activeCategory)}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all",
                userFollowedCategories.has(activeCategory)
                  ? "bg-slate-200 text-slate-500"
                  : "bg-primary text-white shadow-lg shadow-primary/20"
              )}
            >
              {userFollowedCategories.has(activeCategory) ? <Check size={14} /> : <Plus size={14} />}
              {userFollowedCategories.has(activeCategory) ? 'Suivi' : 'Suivre'}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedArticles.length > 0 ? displayedArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              variant="vertical"
              onClick={() => onArticleClick(article)} 
              onBookmark={onBookmark} 
              isBookmarked={bookmarkedIds.has(article.id)}
              onAuthorClick={onAuthorClick}
            />
          )) : (
            <div className="col-span-full py-20 text-center text-slate-400 italic">
              Aucun article trouvé dans cette catégorie.
            </div>
          )}
        </div>
        
        {displayedArticles.length < visibleArticles.length && (
          <div ref={loadingRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
            <ArticleSkeleton />
            <ArticleSkeleton className="hidden md:block" />
            <ArticleSkeleton className="hidden lg:block" />
            <ArticleSkeleton className="hidden xl:block" />
          </div>
        )}

        {displayedArticles.length >= visibleArticles.length && visibleArticles.length > 0 && (
          <div className="flex justify-center pt-8">
            <button 
              onClick={() => onNavigate('search')}
              className="group flex items-center gap-3 bg-white border-2 border-slate-100 px-8 py-4 rounded-2xl font-black text-slate-600 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
            >
              RECHERCHER D'AUTRES SUJETS
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </section>

      {activeCategory === 'À LA UNE' && (
        <>
          <CultureSection 
            posts={(Array.isArray(adminCulturePosts) ? adminCulturePosts : []).filter(p => p.status === 'published')} 
            onPostClick={onPostClick}
            onSeeAll={() => onNavigate('all-culture')}
          />
          
          <div className="my-16 py-12 border-y border-slate-100 African-pattern rounded-[40px] px-6 md:px-10">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tight leading-none text-slate-900">
                  Rejoignez notre <span className="text-primary italic">Newsletter</span> quotidienne
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed text-lg max-w-xl">
                  Chaque matin, recevez une sélection rigoureuse de l'actualité qui façonne l'Afrique et le monde. L'info essentielle, sans le bruit.
                </p>
              </div>
              <div className="w-full lg:w-[450px] shrink-0">
                <NewsletterSignup 
                  variant="sidebar" 
                  className="bg-white/80 backdrop-blur-md shadow-2xl border-primary/20" 
                  onPrivacyClick={() => onNavigate('privacy')}
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100 my-10" />

          <EventSection 
            events={visibleEvents} 
            onEventClick={onEventClick} 
            onSeeAll={() => onNavigate('all-events')}
          />
        </>
      )}
    </motion.div>
  );
};
