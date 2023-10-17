import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import './Accordion.css';
import ReplyIcon from '@mui/icons-material/Reply';

export default function ControlledAccordions({ dados, handleClick, contrato, aba }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(dados.status);

  return (
    <div className="accordion">
      <div className='accordion-div'>
      <Accordion 
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        onClick={handleClick}
        style={{
          backgroundColor:
            contrato !== null && contrato.id_patrimonio === dados.id_patrimonio ? '#FFFFFF' : '#DCDCDC',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <HomeIcon className="icon-home-accordion" />
            {dados.titulo}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{dados.endereco}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className='div-status'>
            <text>{dados.descricao}</text>
            {(parseInt(dados.status) === 1 && (aba === 'Vendas' || aba === 'Compras')) ? (
              <div className='div-status-2'>
                <ReplyIcon className='statusAguardando'/>
                <h6>aguardando assinatura</h6>
              </div>

            ) : <></>}
            {(parseInt(dados.status) === 2 && (aba === 'Vendas' || aba === 'Compras')) ? (
              <div className='div-status-2'>
                <ReplyIcon className='statusConcluido'/>
              </div>

            ) : <></>}
            {(parseInt(dados.status) === 3 && (aba === 'Vendas' || aba === 'Compras')) ? (
              <div className='div-status-2'>
                <ReplyIcon className='statusCancelado'/>
              </div>

            ) : <></>}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
  );
}
