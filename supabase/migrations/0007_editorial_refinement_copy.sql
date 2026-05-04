update public.categories
set description = case slug
  when 'politica' then 'Poder, instituições, eleições, bastidores e decisões públicas que reorganizam a vida nacional.'
  when 'tecnologia' then 'Plataformas, inteligência artificial, regulação, inovação e seus efeitos sociais e econômicos.'
  when 'economia' then 'Mercado, trabalho, empresas, consumo e decisões que chegam ao bolso do leitor.'
  when 'cultura' then 'Ideias, comportamento, artes, entretenimento e as disputas simbólicas do cotidiano.'
  when 'brasil' then 'Acontecimentos nacionais, sociedade, estados e temas públicos fora do eixo mais óbvio.'
  when 'mundo' then 'Geopolítica, conflitos, eleições, economia global e disputas por influência internacional.'
  else description
end
where slug in ('politica', 'tecnologia', 'economia', 'cultura', 'brasil', 'mundo');

insert into public.site_settings (key, value) values
  (
    'site_description',
    'Notícias, bastidores e análise para entender os fatos públicos além da superfície, com atenção a política, tecnologia, economia, cultura, Brasil e mundo.'
  ),
  (
    'footer_text',
    'Projeto editorial independente em desenvolvimento, dedicado a fatos públicos, bastidores e contexto.'
  )
on conflict (key) do update
set value = excluded.value,
    updated_at = now();
