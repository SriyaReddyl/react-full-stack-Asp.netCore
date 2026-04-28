using Backend.DataAccess.Abstruct;
using Backend.Entities;

namespace Backend.DataAccess.Concrete
{
    public class EFMusicDal : EfEntityRepositoryBase<Music, DataContext>, IMusicDal
    {
        public EFMusicDal(DataContext context) : base(context)
        {
        }
    }
}