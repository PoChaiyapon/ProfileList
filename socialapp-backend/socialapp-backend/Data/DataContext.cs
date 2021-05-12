using Microsoft.EntityFrameworkCore;
using socialapp_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socialapp_backend.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options)
            : base(options)
        { 
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}
