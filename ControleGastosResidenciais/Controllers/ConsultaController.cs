using Controle_de_Gastos_Residenciais.Data;
using Controle_de_Gastos_Residenciais.Models;
using Controle_de_Gastos_Residenciais.Models.DTOs;
using Controle_de_Gastos_Residenciais.Services;
using Controle_de_Gastos_Residenciais.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Controle_de_Gastos_Residenciais.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConsultaController : ControllerBase
    {
        private readonly IConsultaService _service;

        public ConsultaController(IConsultaService service)
        {
            _service = service;
        }

        [HttpGet("TotaisPorPessoa")]
        public async Task<IActionResult> TotaisPorPessoa()
        {
            var resultado = await _service.ObterTotaisPorPessoa();
            return Ok(resultado);
        }


        [HttpGet("TotaisPorCategoria")]
        public async Task<IActionResult> TotaisPorCategoria()
        {
            var resultado = await _service.ObterTotaisPorCategoria();
            return Ok(resultado);
        }
    }
}