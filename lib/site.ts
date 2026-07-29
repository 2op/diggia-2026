export const SITE_URL = 'https://www.diggia.com.br';
export const SITE_NAME = 'Diggia AI';
export const PHONE = '+55-49-99928-9840';
export const EMAIL = 'contato@diggia.com.br';
export const WHATSAPP_NUMBER = '5549999289840';

/** Link do WhatsApp com a mensagem já preenchida. */
export function whatsappUrl(message: string) {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrão dos CTAs que não são de uma solução específica. */
export const WHATSAPP_DEFAULT_MESSAGE =
	'Olá! Vim do site da Diggia e quero entender como a IA pode ajudar minha empresa.';
export const ADDRESS = {
	streetAddress: 'R. Araguaia 494, Colatto',
	addressLocality: 'Xanxerê',
	addressRegion: 'SC',
	postalCode: '89820-000',
	addressCountry: 'BR',
};

export interface PageDef {
	slug: string; // '' para a home
	title: string;
	description: string;
	h1: string;
	breadcrumb?: string;
	service?: { name: string; description: string };
	faq?: { question: string; answer: string }[];
}

export const PAGES: Record<string, PageDef> = {
	home: {
		slug: '',
		title: 'Diggia AI | Inteligência Artificial para PMEs',
		description:
			'A Diggia implementa automação e agentes de IA para pequenas e médias empresas brasileiras. Comece pelo processo que mais dói.',
		h1: 'Transforme sua empresa com Inteligência Artificial',
	},
	'automacao-de-processos': {
		slug: 'automacao-de-processos',
		title: 'Automação de processos para PMEs | Diggia AI',
		description:
			'Automatize tarefas repetitivas em cima dos sistemas que sua empresa já usa. Primeira automação em produção em semanas, com escopo enxuto e custo definido antes.',
		h1: 'Automação de processos para empresas que não têm tempo a perder',
		breadcrumb: 'Automação de processos',
		service: {
			name: 'Automação de processos',
			description:
				'Automação de tarefas repetitivas e integração de sistemas para pequenas e médias empresas, sem trocar os sistemas atuais.',
		},
		faq: [
			{
				question: 'Preciso trocar meus sistemas atuais?',
				answer: 'Não. Automatizamos em cima do que você já usa. O objetivo é integrar, não substituir.',
			},
			{
				question: 'Quanto tempo leva?',
				answer: 'Depende do processo, mas nosso método prioriza uma primeira automação em produção em semanas. Projetos longos vêm depois, se fizerem sentido.',
			},
			{
				question: 'Minha empresa é pequena demais para isso?',
				answer: 'Se existe tarefa repetitiva, existe o que automatizar. Nosso modelo foi desenhado para PMEs: escopo enxuto, custo definido antes.',
			},
			{
				question: 'E se o processo mudar depois?',
				answer: 'Automação não é estátua. Acompanhamos e ajustamos conforme sua operação evolui.',
			},
		],
	},
	'agentes-de-ia': {
		slug: 'agentes-de-ia',
		title: 'Agentes de IA para atendimento e vendas | Diggia AI',
		description:
			'Agentes de IA treinados no conhecimento da sua empresa: atendimento no WhatsApp via API oficial, respostas 24/7 e transferência para humanos quando necessário.',
		h1: 'Agentes de IA que trabalham com o conhecimento da sua empresa',
		breadcrumb: 'Agentes de IA',
		service: {
			name: 'Agentes de IA',
			description:
				'Agentes de IA treinados no conhecimento da empresa para atendimento, qualificação de leads e suporte, incluindo WhatsApp via API oficial.',
		},
		faq: [
			{
				question: 'O agente vai falar bobagem para meu cliente?',
				answer: 'Esse é o risco número um de IA mal implementada, e o motivo de existir nossa etapa de testes supervisionados e limites de atuação. O agente responde só sobre o que foi treinado e transfere o resto para humanos.',
			},
			{
				question: 'Funciona no WhatsApp?',
				answer: 'Sim, via API oficial do WhatsApp Business, sem gambiarras que arriscam o número da empresa.',
			},
			{
				question: 'Substitui minha equipe de atendimento?',
				answer: 'Substitui o repetitivo. Sua equipe para de responder "qual o horário de vocês?" pela décima vez e passa a cuidar dos casos que precisam de gente.',
			},
			{
				question: 'Preciso de uma base de conhecimento pronta?',
				answer: 'Não. Estruturar esse conteúdo faz parte do projeto.',
			},
		],
	},
	'consultoria-de-ia': {
		slug: 'consultoria-de-ia',
		title: 'Consultoria de IA: por onde começar | Diggia AI',
		description:
			'Diagnóstico gratuito de 30 minutos e consultoria completa com mapeamento da operação, roadmap de IA e plano de implementação documentado.',
		h1: 'Consultoria de IA: descubra por onde começar antes de gastar',
		breadcrumb: 'Consultoria de IA',
		service: {
			name: 'Consultoria de IA',
			description:
				'Diagnóstico e consultoria de Inteligência Artificial para PMEs: mapeamento da operação, roadmap e plano de implementação.',
		},
		faq: [
			{
				question:
					'O diagnóstico gratuito e a consultoria são a mesma coisa?',
				answer: 'Não. O diagnóstico gratuito é uma conversa de 30 minutos com uma leitura inicial e uma recomendação de caminho. A consultoria completa aprofunda: mapeamento da operação, roadmap e plano de implementação documentados.',
			},
			{
				question: 'Vocês só recomendam ou também implementam?',
				answer: 'As duas coisas, mas o roadmap é seu. Se preferir implementar com outro parceiro ou time interno, o documento serve do mesmo jeito.',
			},
			{
				question: 'Minha empresa precisa ter dados organizados antes?',
				answer: 'Não. Descobrir o estado real dos seus dados é parte do diagnóstico, não pré-requisito.',
			},
		],
	},
	sobre: {
		slug: 'sobre',
		title: 'Sobre a Diggia AI: quem somos | Diggia AI',
		description:
			'A Diggia nasceu da 2op Digital, com 18 anos de mercado e mais de 200 clientes, para levar IA aplicada a pequenas e médias empresas brasileiras.',
		h1: 'A ponte entre o presente da sua empresa e o que a IA pode fazer por ela',
		breadcrumb: 'Sobre',
	},
	contato: {
		slug: 'contato',
		title: 'Contato | Diggia AI',
		description:
			'Fale com a Diggia por WhatsApp, e-mail ou formulário. Atendemos PMEs de todo o Brasil a partir de Xanxerê - SC.',
		h1: 'Fale com a Diggia',
		breadcrumb: 'Contato',
	},
	'politica-de-privacidade': {
		slug: 'politica-de-privacidade',
		title: 'Política de privacidade | Diggia AI',
		description:
			'Como a Diggia AI coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.',
		h1: 'Política de privacidade',
		breadcrumb: 'Política de privacidade',
	},
};

export function pageUrl(slug: string) {
	return slug ? `${SITE_URL}/${slug}` : SITE_URL;
}

/* ---------- JSON-LD ---------- */

export const organizationJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': `${SITE_URL}/#organization`,
	name: SITE_NAME,
	url: SITE_URL,
	logo: `${SITE_URL}/logo.svg`,
	slogan: 'Think big, start small, grow fast',
	description:
		'A Diggia implementa automação de processos, agentes de IA e consultoria de IA para pequenas e médias empresas brasileiras.',
	email: EMAIL,
	telephone: PHONE,
	address: { '@type': 'PostalAddress', ...ADDRESS },
	parentOrganization: { '@type': 'Organization', name: '2op Digital' },
	areaServed: 'BR',
};

export const localBusinessJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ProfessionalService',
	'@id': `${SITE_URL}/#localbusiness`,
	name: SITE_NAME,
	image: `${SITE_URL}/logo.svg`,
	url: SITE_URL,
	telephone: PHONE,
	email: EMAIL,
	priceRange: '$$',
	address: { '@type': 'PostalAddress', ...ADDRESS },
	geo: { '@type': 'GeoCoordinates', latitude: -26.8769, longitude: -52.4043 },
	areaServed: 'BR',
	parentOrganization: { '@type': 'Organization', name: '2op Digital' },
};

export function serviceJsonLd(page: PageDef) {
	if (!page.service) return null;
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: page.service.name,
		description: page.service.description,
		url: pageUrl(page.slug),
		serviceType: page.service.name,
		provider: { '@id': `${SITE_URL}/#organization` },
		areaServed: 'BR',
		audience: {
			'@type': 'BusinessAudience',
			name: 'Pequenas e médias empresas',
		},
	};
}

export function faqJsonLd(page: PageDef) {
	if (!page.faq?.length) return null;
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: page.faq.map((f) => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: { '@type': 'Answer', text: f.answer },
		})),
	};
}

export function breadcrumbJsonLd(page: PageDef) {
	if (!page.breadcrumb) return null;
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Início',
				item: SITE_URL,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: page.breadcrumb,
				item: pageUrl(page.slug),
			},
		],
	};
}
