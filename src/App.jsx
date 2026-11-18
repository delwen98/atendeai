import { useState } from 'react';
import {
  Activity, Bot, ChevronDown, ChevronRight, CircleHelp, Clock3,
  Command, LayoutDashboard, MessageCircle, MoreHorizontal,
  Plus, Search, Send, Settings, ShieldCheck, Sparkles, Users,
  Zap, Menu, X, ArrowUpRight, CheckCheck, Filter
} from 'lucide-react';

const initialChats = [
  { id: 1, name: 'Mariana Costa', initials: 'MC', color: 'violet', message: 'Gostaria de saber os horários disponíveis.', time: '10:42', unread: 2, status: 'IA respondeu', tag: 'Agendamento' },
  { id: 2, name: 'Rafael Mendes', initials: 'RM', color: 'blue', message: 'Qual é o valor do serviço?', time: '10:18', unread: 1, status: 'Aguardando', tag: 'Orçamento' },
  { id: 3, name: 'Camila Oliveira', initials: 'CO', color: 'pink', message: 'Perfeito, muito obrigada!', time: '09:56', unread: 0, status: 'Resolvida', tag: 'Dúvida' },
  { id: 4, name: 'Lucas Ferreira', initials: 'LF', color: 'green', message: 'Vocês atendem aos sábados?', time: 'Ontem', unread: 0, status: 'IA respondeu', tag: 'Informação' },
];

const nav = [
  { label: 'Principal', items: [{ id: 'overview', label: 'Visão geral', icon: LayoutDashboard }, { id: 'conversations', label: 'Conversas', icon: MessageCircle, count: '3' }, { id: 'contacts', label: 'Contatos', icon: Users }] },
  { label: 'Automação', items: [{ id: 'assistant', label: 'Assistente IA', icon: Bot }, { id: 'activity', label: 'Atividade', icon: Activity }] },
  { label: 'Sistema', items: [{ id: 'settings', label: 'Configurações', icon: Settings }] },
];

function App() {
  const [active, setActive] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState(initialChats);
  const [selected, setSelected] = useState(1);
  const [reply, setReply] = useState('');
  const [botOn, setBotOn] = useState(true);
  const currentChat = chats.find(c => c.id === selected) || chats[0];
  const filteredChats = chats.filter(c => (c.name + c.message).toLowerCase().includes(search.toLowerCase()));

  const title = ({ overview: 'Visão geral', conversations: 'Conversas', contacts: 'Contatos', assistant: 'Assistente IA', activity: 'Atividade', settings: 'Configurações' })[active];

  function sendReply(e) {
    e.preventDefault();
    if (!reply.trim()) return;
    setChats(prev => prev.map(c => c.id === selected ? { ...c, message: reply, time: 'Agora', status: 'Respondida' } : c));
    setReply('');
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Bot size={21}/></div><span>atende<span className="brand-ai">ai</span></span><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="workspace"><div className="workspace-icon">N</div><div className="workspace-copy"><strong>Meu negócio</strong><small>Plano inicial</small></div><ChevronDown size={15}/></div>
      {nav.map(group => <div className="nav-group" key={group.label}><div className="nav-label">{group.label}</div>{group.items.map(item => <button key={item.id} onClick={() => {setActive(item.id);setMobileOpen(false)}} className={`nav-item ${active === item.id ? 'active' : ''}`}><item.icon size={18}/><span>{item.label}</span>{item.count && <b>{item.count}</b>}</button>)}</div>)}
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><strong>Precisa de ajuda?</strong><p>Veja como configurar seu atendimento.</p><button onClick={() => setActive('settings')}>Acessar central <ArrowUpRight size={13}/></button></div><div className="profile"><div className="avatar avatar-user">DF</div><div className="profile-info"><strong>Administrador</strong><small>admin@atendeai.app</small></div><MoreHorizontal size={18}/></div></div>
    </aside>

    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"/>}
    <main className="main">
      <header className="topbar"><div className="top-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><span className="breadcrumb">Workspace</span><ChevronRight size={14}/><strong>{title}</strong></div><div className="top-actions"><div className="connection"><span className="live-dot"/> Sistema ativo</div><button className="icon-button" title="Ajuda"><CircleHelp size={18}/></button><div className="avatar avatar-user top-avatar">DF</div></div></header>
      <div className="page">
        {active === 'overview' && <Overview botOn={botOn} setBotOn={setBotOn} setActive={setActive} chats={chats}/>} 
        {active === 'conversations' && <section className="page-section"><div className="page-heading"><div><div className="eyebrow">CENTRAL DE ATENDIMENTO</div><h1>Conversas</h1><p>Acompanhe e gerencie os atendimentos do seu negócio.</p></div><button className="primary-button" onClick={() => setActive('settings')}><Plus size={16}/> Nova conexão</button></div><div className="inbox-layout"><div className="chat-list"><div className="chat-toolbar"><div className="searchbox"><Search size={16}/><input placeholder="Buscar conversa..." value={search} onChange={e=>setSearch(e.target.value)}/></div><button className="icon-button"><Filter size={17}/></button></div>{filteredChats.map(c=><button className={`chat-row ${selected===c.id?'chat-selected':''}`} key={c.id} onClick={()=>setSelected(c.id)}><div className={`avatar avatar-${c.color}`}>{c.initials}</div><div className="chat-row-content"><div className="chat-row-top"><strong>{c.name}</strong><time>{c.time}</time></div><p>{c.message}</p><div className="chat-row-bottom"><span className="tag">{c.tag}</span>{c.unread>0&&<b className="unread">{c.unread}</b>}</div></div></button>)}</div><div className="conversation"><div className="conversation-head"><div className={`avatar avatar-${currentChat.color}`}>{currentChat.initials}</div><div><strong>{currentChat.name}</strong><small><span className="live-dot"/> WhatsApp · {currentChat.status}</small></div><button className="icon-button push"><MoreHorizontal size={19}/></button></div><div className="messages"><div className="date-pill">Hoje</div><div className="bubble incoming">{currentChat.message}<time>{currentChat.time}</time></div><div className="ai-note"><Sparkles size={14}/> Atendimento de demonstração — mensagens não conectadas ao WhatsApp.</div></div><form className="reply-box" onSubmit={sendReply}><input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Digite uma mensagem..." /><button type="submit" className="send-button"><Send size={16}/></button></form></div></div></section>}
        {active === 'contacts' && <section className="page-section"><div className="page-heading"><div><div className="eyebrow">RELACIONAMENTO</div><h1>Contatos</h1><p>Seus clientes e leads em um só lugar.</p></div><button className="primary-button"><Plus size={16}/> Adicionar contato</button></div><div className="panel"><div className="empty-state"><div className="empty-icon"><Users size={24}/></div><h3>Seus contatos aparecerão aqui</h3><p>Quando seu WhatsApp estiver conectado, os contatos serão organizados automaticamente.</p></div></div></section>}
        {active === 'assistant' && <section className="page-section"><div className="page-heading"><div><div className="eyebrow">AUTOMAÇÃO INTELIGENTE</div><h1>Assistente IA</h1><p>Configure como seu assistente conversa com os clientes.</p></div><span className="status-pill"><span className="live-dot"/> {botOn?'Ativo':'Pausado'}</span></div><div className="settings-grid"><div className="panel setting-panel"><div className="setting-icon purple"><Bot size={21}/></div><h3>Atendimento automático</h3><p>Permita que a IA responda às perguntas frequentes dos seus clientes.</p><button className={`toggle ${botOn?'toggle-on':''}`} onClick={()=>setBotOn(!botOn)}><span/></button><small>{botOn?'O assistente está ativado (modo demonstração).':'O assistente está pausado.'}</small></div><div className="panel setting-panel"><div className="setting-icon amber"><Sparkles size={21}/></div><h3>Personalidade do assistente</h3><p>Defina o tom de voz, as instruções e as informações do seu negócio.</p><button className="secondary-button" onClick={()=>setActive('settings')}>Configurar assistente <ChevronRight size={15}/></button></div></div></section>}
        {active === 'activity' && <section className="page-section"><div className="page-heading"><div><div className="eyebrow">MONITORAMENTO</div><h1>Atividade</h1><p>Veja o que está acontecendo no seu atendimento.</p></div></div><div className="panel"><div className="empty-state"><div className="empty-icon"><Clock3 size={24}/></div><h3>Nenhuma atividade registrada</h3><p>Os eventos do seu atendimento aparecerão aqui quando as integrações estiverem ativas.</p></div></div></section>}
        {active === 'settings' && <section className="page-section"><div className="page-heading"><div><div className="eyebrow">SEU ESPAÇO</div><h1>Configurações</h1><p>Gerencie seu negócio e as integrações do AtendeAI.</p></div></div><div className="settings-grid"><div className="panel setting-panel"><div className="setting-icon green"><MessageCircle size={21}/></div><h3>WhatsApp Business</h3><p>Conecte seu número pela API oficial da Meta para começar a receber mensagens.</p><span className="status-pill muted">Não conectado</span></div><div className="panel setting-panel"><div className="setting-icon purple"><Sparkles size={21}/></div><h3>Inteligência artificial</h3><p>Configure o provedor e as instruções do assistente.</p><span className="status-pill muted">Configuração pendente</span></div><div className="panel setting-panel"><div className="setting-icon blue"><ShieldCheck size={21}/></div><h3>Dados e segurança</h3><p>As contas de cada empresa terão dados isolados.</p><span className="status-pill muted">A preparar</span></div></div></section>}
      </div>
      <footer className="footer"><span>© 2026 AtendeAI</span><span>Feito para simplificar seu atendimento <span className="footer-heart">♥</span></span></footer>
    </main>
  </div>;
}

function Overview({botOn,setBotOn,setActive,chats}) {
  return <section className="page-section">
    <div className="welcome-row"><div><div className="eyebrow">QUARTA-FEIRA, 18 DE NOVEMBRO</div><h1>Bom dia! <span className="wave">✦</span></h1><p>Aqui está o resumo do seu atendimento.</p></div><button className="outline-button" onClick={()=>setActive('settings')}><Settings size={16}/> Configurar negócio</button></div>
    <div className="banner"><div className="banner-orb orb-one"/><div className="banner-orb orb-two"/><div className="banner-content"><div className="banner-kicker"><Sparkles size={14}/> SEU ATENDIMENTO, MAIS INTELIGENTE</div><h2>Seu negócio merece<br/>um atendimento <em>extraordinário.</em></h2><p>Conecte seu WhatsApp e deixe seu assistente cuidar das primeiras conversas.</p><button onClick={()=>setActive('settings')}>Conectar WhatsApp <ArrowUpRight size={15}/></button></div><div className="banner-art"><div className="art-glow"/><div className="bot-orbit orbit-a"/><div className="bot-orbit orbit-b"/><div className="bot-illustration"><Bot size={76} strokeWidth={1.2}/><span className="bot-spark spark-a">✦</span><span className="bot-spark spark-b">✧</span></div><div className="floating-chip"><span className="live-dot"/> IA pronta para ajudar</div></div></div>
    <div className="section-title"><div><h2>Visão geral</h2><p>Acompanhe os números do seu atendimento.</p></div><span className="period-label">Últimos 7 dias <ChevronDown size={14}/></span></div>
    <div className="stats-grid"><Stat icon={MessageCircle} label="Conversas recebidas" value="0" note="Aguardando conexão" tone="blue"/><Stat icon={Bot} label="Respondidas pela IA" value="0" note="Automação pendente" tone="purple"/><Stat icon={Users} label="Novos contatos" value="0" note="Nenhum contato ainda" tone="green"/><Stat icon={Clock3} label="Tempo médio de resposta" value="—" note="Sem dados disponíveis" tone="amber"/></div>
    <div className="overview-grid"><div className="panel activity-panel"><div className="panel-heading"><div><h3>Conversas recentes</h3><p>Últimos atendimentos recebidos</p></div><button className="text-button" onClick={()=>setActive('conversations')}>Ver todas <ArrowUpRight size={14}/></button></div><div className="recent-list">{chats.slice(0,3).map(c=><div className="recent-row" key={c.id}><div className={`avatar avatar-${c.color}`}>{c.initials}</div><div className="recent-copy"><strong>{c.name}</strong><p>{c.message}</p></div><time>{c.time}</time></div>)}</div><div className="demo-caption">Dados ilustrativos para demonstração do painel.</div></div><div className="panel assistant-panel"><div className="panel-heading"><div><h3>Seu assistente</h3><p>Status da automação</p></div><div className="assistant-badge"><Bot size={19}/></div></div><div className="assistant-status"><span className={`status-dot ${botOn?'':'paused'}`}/><strong>{botOn?'Pronto para configurar':'Assistente pausado'}</strong></div><p className="assistant-description">Seu assistente está em modo de demonstração. Conecte os serviços para iniciar os atendimentos reais.</p><div className="assistant-actions"><button className="toggle" aria-label="Ativar ou pausar assistente" onClick={()=>setBotOn(!botOn)}><span/></button><span>Atendimento automático</span></div><button className="secondary-button full" onClick={()=>setActive('assistant')}>Configurar assistente <ChevronRight size={15}/></button></div></div>
    <div className="setup-strip"><div className="setup-icon"><Zap size={19}/></div><div><strong>Vamos colocar seu atendimento para funcionar?</strong><p>Conclua as configurações iniciais para ativar o AtendeAI.</p></div><button onClick={()=>setActive('settings')}>Continuar configuração <ChevronRight size={15}/></button></div>
  </section>;
}
function Stat({icon:Icon,label,value,note,tone}) { return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon ${tone}`}><Icon size={18}/></div></div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div> }

export default App;