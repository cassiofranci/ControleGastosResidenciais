using Controle_de_Gastos_Residenciais.Models.DTOs;
using Controle_de_Gastos_Residenciais.Services;
using Microsoft.AspNetCore.Mvc;

namespace Controle_de_Gastos_Residenciais.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly TransacaoService _service;
        //Utilizando o Service para não utilizar regras de negocio no controller
        public TransacaoController(TransacaoService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Create([FromBody] TransacaoCriacaoDto dto)
        {
            try
            {
                var transacao = _service.Criar(dto);
                return CreatedAtAction(nameof(GetById), new { id = transacao.Id }, transacao);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.Listar());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var transacao = _service.BuscarPorId(id);
            if (transacao == null)
                return NotFound();

            return Ok(transacao);
        }       
    }
}
