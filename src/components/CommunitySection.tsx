'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import communityData from '@/data/community.json';
import { Bell, Calendar, Heart, Send, CheckCircle2, MessageSquareQuote, ShieldAlert } from 'lucide-react';

interface Story {
  id: string;
  author: string;
  relation: string;
  titleEn: string;
  titleHi: string;
  textEn: string;
  textHi: string;
  date?: string;
  isSample?: boolean;
}

export const CommunitySection: React.FC = () => {
  const { t, language } = useLanguage();
  const [stories, setStories] = useState<Story[]>(communityData.stories);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      const savedCustomStories = localStorage.getItem('tandiyun_custom_stories');
      if (savedCustomStories) {
        const parsed = JSON.parse(savedCustomStories);
        if (Array.isArray(parsed)) {
          setStories([...parsed, ...communityData.stories]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);

    setTimeout(() => {
      const newStory: Story = {
        id: `story-${Date.now()}`,
        author: name.trim(),
        relation: relation.trim() || (language === 'hi' ? 'ग्रामवासी' : 'Villager / Friend'),
        titleEn: title.trim() || 'A Memory of Tandiyun',
        titleHi: title.trim() || 'टांडियूं का एक संस्मरण',
        textEn: message.trim(),
        textHi: message.trim(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };

      const updated = [newStory, ...stories];
      setStories(updated);

      try {
        const customOnly = updated.filter((s) => !communityData.stories.some((cs) => cs.id === s.id));
        localStorage.setItem('tandiyun_custom_stories', JSON.stringify(customOnly));
      } catch {
        // ignore
      }

      setSubmitting(false);
      setSubmittedSuccess(true);
      setName('');
      setRelation('');
      setTitle('');
      setMessage('');

      setTimeout(() => setSubmittedSuccess(false), 6000);
    }, 600);
  };

  return (
    <section id="community" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-forest-dark border-t border-mist/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-mist/20 bg-forest/40 text-earth-light text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>{t.community.badge}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-ivory font-bold tracking-wide">
            {t.community.title}
          </h2>
          <p className="mt-4 text-mist/80 text-base sm:text-lg max-w-3xl">
            {t.community.subtitle}
          </p>
          <div className="w-20 h-0.5 bg-earth mt-6 rounded-full" />
        </div>

        {/* Demonstration Content Notice */}
        <div className="mb-12 p-3.5 rounded-xl bg-forest/50 border border-mist/15 text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs font-mono text-mist/70">
          <ShieldAlert className="w-4 h-4 text-earth-light shrink-0" />
          <span>Notice: Initial announcements & memories are sample demonstration entries.</span>
        </div>

        {/* Grid: Announcements & Events (Col 1) and Memory Submission & Stories (Col 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Announcements & Upcoming Events (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            {/* Announcements */}
            <div>
              <div className="flex items-center gap-2 text-sm uppercase font-mono tracking-wider text-earth-light mb-4">
                <Bell className="w-4 h-4" />
                <span>{t.community.announcementsTitle}</span>
              </div>
              <div className="space-y-4">
                {communityData.announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-5 rounded-xl border border-mist/15 bg-forest/60 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-earth-light bg-forest-dark px-2 py-0.5 rounded border border-mist/10">
                        {language === 'hi' ? ann.badgeHi : ann.badge}
                      </span>
                      <span className="text-[11px] font-mono text-mist/60">{ann.date}</span>
                    </div>
                    <h4 className="font-heading text-lg text-ivory font-semibold">
                      {language === 'hi' ? ann.titleHi : ann.titleEn}
                    </h4>
                    <p className="text-xs text-mist/80 mt-1.5 leading-relaxed font-serif">
                      {language === 'hi' ? ann.contentHi : ann.contentEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex items-center gap-2 text-sm uppercase font-mono tracking-wider text-earth-light mb-4">
                <Calendar className="w-4 h-4" />
                <span>{t.community.eventsTitle}</span>
              </div>
              <div className="space-y-4">
                {communityData.upcomingEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-5 rounded-xl border border-mist/15 bg-forest/60 backdrop-blur-sm flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-earth-light">
                        {ev.type}
                      </span>
                      <h4 className="font-heading text-lg text-ivory font-semibold mt-1">
                        {language === 'hi' ? ev.titleHi : ev.titleEn}
                      </h4>
                      <div className="text-xs text-mist/75 mt-1.5 font-mono">
                        {language === 'hi' ? ev.locationHi : ev.locationEn}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[11px] font-mono text-earth-light font-bold">
                        {language === 'hi' ? ev.dateHi : ev.dateEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form & Shared Memories Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Submission Form */}
            <div className="p-6 sm:p-8 rounded-2xl border border-mist/20 bg-forest/70 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2 text-sm uppercase font-mono tracking-wider text-earth-light mb-2">
                <Send className="w-4 h-4" />
                <span>{t.community.shareCta}</span>
              </div>
              <h3 className="font-heading text-2xl text-ivory font-bold mb-6">
                {language === 'hi'
                  ? 'अपनी यादें, किस्से या फोटो अभिलेखागार में जोड़ें'
                  : 'Contribute to the Living Village Archive'}
              </h3>

              {submittedSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-forest-light/30 border border-mist/30 flex items-center gap-3 text-sm text-ivory animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-earth-light shrink-0" />
                  <span>{t.community.form.success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-mist/75 uppercase tracking-wider mb-1.5">
                      {t.community.form.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.community.form.namePlaceholder}
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-forest-dark border border-mist/20 text-ivory placeholder-mist/40 text-base sm:text-sm focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-mist/75 uppercase tracking-wider mb-1.5">
                      {t.community.form.relationLabel}
                    </label>
                    <input
                      type="text"
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      placeholder={t.community.form.relationPlaceholder}
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-forest-dark border border-mist/20 text-ivory placeholder-mist/40 text-base sm:text-sm focus:outline-none focus:border-earth transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist/75 uppercase tracking-wider mb-1.5">
                    {t.community.form.titleLabel}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t.community.form.titlePlaceholder}
                    className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-forest-dark border border-mist/20 text-ivory placeholder-mist/40 text-base sm:text-sm focus:outline-none focus:border-earth transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist/75 uppercase tracking-wider mb-1.5">
                    {t.community.form.messageLabel} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.community.form.messagePlaceholder}
                    className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-forest-dark border border-mist/20 text-ivory placeholder-mist/40 text-base sm:text-sm focus:outline-none focus:border-earth transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-[11px] font-mono text-mist/60 text-left">
                    {t.community.form.privacyNotice}
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-earth hover:bg-earth-light text-ivory font-medium text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl shrink-0"
                  >
                    {submitting ? t.community.form.submitting : t.community.form.submit}
                  </button>
                </div>
              </form>
            </div>

            {/* Stories / Memories Feed */}
            <div>
              <div className="flex items-center gap-2 text-sm uppercase font-mono tracking-wider text-earth-light mb-4">
                <MessageSquareQuote className="w-4 h-4" />
                <span>{t.community.memoriesTitle} ({stories.length})</span>
              </div>

              <div className="space-y-4">
                {stories.map((story) => (
                  <div
                    key={story.id}
                    className="p-6 rounded-2xl border border-mist/15 bg-forest/60 backdrop-blur-sm shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-lg text-ivory font-semibold">
                          {story.author}
                        </span>
                        <span className="text-[11px] font-mono text-earth-light bg-forest-dark px-2 py-0.5 rounded">
                          {story.relation}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-mist/50">{story.date}</span>
                    </div>

                    <h4 className="font-serif italic text-base text-earth-light font-medium mt-1">
                      &ldquo;{language === 'hi' ? story.titleHi : story.titleEn}&rdquo;
                    </h4>

                    <p className="text-sm text-mist/90 mt-2 leading-relaxed font-serif">
                      {language === 'hi' ? story.textHi : story.textEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

