using sct.ent.cms;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace sct.svc.cms.imp
{

  public class ArticleVideoRpt
  {

    public void Insert(DbContext DbContext,ArticleVideo entity)
    {
      DbContext.Entry(entity).State = EntityState.Added;
    }

     public void Update(DbContext DbContext,ArticleVideo entity)
     {
       EntityState state = DbContext.Entry(entity).State;
       if (state == EntityState.Detached)
       {
          DbContext.Entry(entity).State = EntityState.Modified;
        }
    }

    public void Delete(DbContext DbContext,ArticleVideo  entity)
    {
       DbContext.Entry(entity).State = EntityState.Deleted;
    }

     public ArticleVideo Get(DbContext DbContext, string key)
    {
        return DbContext.Set<ArticleVideo>().Where(p => p.Id.Equals(key)).FirstOrDefault();
    }

    public void Insert(DbContext DbContext, IEnumerable<ArticleVideo> entities)
    {
       try
       {
          DbContext.Configuration.AutoDetectChangesEnabled = false;
          foreach (ArticleVideo  entity in entities)
          {
            DbContext.Entry(entity).State = EntityState.Added;
          }
       }
       finally
       {
         DbContext.Configuration.AutoDetectChangesEnabled = true;
       }
    }

    public void Update(DbContext DbContext, IEnumerable<ArticleVideo> entities)
    {
       try
       {
          DbContext.Configuration.AutoDetectChangesEnabled = false;
          foreach (ArticleVideo  entity in entities)
          {
              EntityState state = DbContext.Entry(entity).State;
              if (state == EntityState.Detached)
             {
                DbContext.Entry(entity).State = EntityState.Modified;
             }
          }
       }
       finally
       {
         DbContext.Configuration.AutoDetectChangesEnabled = true;
       }
    }

    public void Delete(DbContext DbContext, IEnumerable<ArticleVideo> entities)
    {
       try
       {
          DbContext.Configuration.AutoDetectChangesEnabled = false;
          foreach (ArticleVideo  entity in entities)
          {
             DbContext.Entry(entity).State = EntityState.Deleted;
          }
       }
       finally
       {
         DbContext.Configuration.AutoDetectChangesEnabled = true;
       }
      }

  }

}
