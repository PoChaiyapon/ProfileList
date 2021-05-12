using Microsoft.AspNetCore.Mvc.Filters;
using socialapp_backend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace socialapp_backend.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<ISocialRepository>(); //GetService using  Microsoft.Extensions.DependencyInjection
            var user = await repo.GetUser(userId);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}
